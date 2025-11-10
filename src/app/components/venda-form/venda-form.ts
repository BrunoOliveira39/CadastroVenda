import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
// Importa os serviços e interfaces necessários
import { VendaForm, ItemVendaForm, VendaService } from '../../services/venda';
import { Cliente, ClienteService } from '../../services/cliente';
import { Produto, ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-venda-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './venda-form.html',
  // styleUrls: ...
})
export class VendaFormComponent implements OnInit {

  // Modelos para os dropdowns
  clientes: Cliente[] = [];
  produtos: Produto[] = [];

  // Modelos para o formulário principal
  clienteIdSelecionado: number = 0;

  // Modelos para o "mini-form" de adicionar item
  produtoIdSelecionado: number = 0;
  quantidadeItem: number = 1;

  // O "Carrinho" - Lista de itens a serem enviados
  itensParaVenda: ItemVendaForm[] = [];

  // (Usado para exibir nomes no carrinho)
  produtosAdicionadosMap: Map<number, string> = new Map();


  constructor(
    private router: Router,
    private vendaService: VendaService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    // Carrega os dropdowns de Clientes e Produtos
    this.loadClientes();
    this.loadProdutos();
  }

  loadClientes(): void {
    this.clienteService.getClientes().subscribe(data => this.clientes = data);
  }

  loadProdutos(): void {
    // Filtramos produtos com estoque > 0
    this.produtoService.getProdutos().subscribe(data => {
      this.produtos = data.filter(p => p.quantidade > 0);
    });
  }


  adicionarItem(): void {
    // 1. Converte os valores dos inputs para número
    const produtoIdNum = +this.produtoIdSelecionado;
    const quantidadeNum = +this.quantidadeItem;

    // 2. Validação (mesma de antes)
    if (produtoIdNum <= 0 || quantidadeNum <= 0) {
      alert("Por favor, selecione um produto e uma quantidade válida.");
      return;
    }

    // 3. Busca o produto selecionado na lista (mesmo de antes)
    const produto = this.produtos.find(p => p.codproduto === produtoIdNum);
    if (!produto) {
      alert("Produto não encontrado.");
      return;
    }

    // V---- NOVA LÓGICA DE VERIFICAÇÃO DE ESTOQUE ----V

    // 4. Pega o estoque atual (ex: 150)
    const estoqueAtual = produto.quantidade;

    // 5. Verifica se o item já está no carrinho
    const itemExistente = this.itensParaVenda.find(
      item => item.produtoId === produtoIdNum
    );

    // 6. Calcula a quantidade *total* que o usuário quer (carrinho + nova adição)
    let quantidadeTotalDesejada = quantidadeNum;
    if (itemExistente) {
      quantidadeTotalDesejada = +itemExistente.quantidade + quantidadeNum;
    }

    // 7. Compara o total desejado com o estoque atual
    // (compara se 151 > 150)
    if (quantidadeTotalDesejada > estoqueAtual) {
      alert(
        `Estoque insuficiente para "${produto.nomeproduto}".\n\n` +
        `Estoque disponível: ${estoqueAtual}\n` +
        `Quantidade no carrinho: ${itemExistente ? itemExistente.quantidade : 0}\n` +
        `Você tentou adicionar: ${quantidadeNum}`
      );
      return; // Impede a adição
    }

    // 8. Se o estoque estiver OK, atualiza ou adiciona o item (lógica antiga)
    if (itemExistente) {
      // Se existir: Apenas soma a nova quantidade
      itemExistente.quantidade = quantidadeTotalDesejada;
    
    } else {
      // Se não existir: Adiciona o novo item ao array
      this.itensParaVenda.push({
        produtoId: produtoIdNum,
        quantidade: quantidadeNum
      });

      // E adiciona o nome do produto ao Map
      this.produtosAdicionadosMap.set(produtoIdNum, produto.nomeproduto);
    }

    // 9. Reseta os campos do "mini-form"
    this.produtoIdSelecionado = 0;
    this.quantidadeItem = 1;
  }

  
   /** Remove um item do "carrinho" (itensParaVenda)**/
   
  removerItem(produtoId: number): void {
    // 1. Filtra o array de itens, mantendo apenas os que NÃO têm o produtoId
    this.itensParaVenda = this.itensParaVenda.filter(
      item => item.produtoId !== produtoId
    );

    // 2. Remove o produto do Map de nomes (para limpar a memória)
    this.produtosAdicionadosMap.delete(produtoId);
  }

  // Ação final de salvar
  onSubmit(): void {
    if (this.clienteIdSelecionado <= 0) {
      alert("Por favor, selecione um cliente.");
      return;
    }
    if (this.itensParaVenda.length === 0) {
      alert("Por favor, adicione pelo menos um item à venda.");
      return;
    }

    // 1. Monta o DTO final (VendaForm)
    const vendaForm: VendaForm = {
      clienteId: this.clienteIdSelecionado,
      itens: this.itensParaVenda
    };

    // 2. Envia para o serviço
    this.vendaService.createVenda(vendaForm).subscribe({
      next: () => {
        alert("Venda salva com sucesso!");
        this.router.navigate(['/vendas']);
      },
      error: (err) => {
        console.error('Erro ao salvar venda', err);
        // O backend (VendaService.java) envia mensagens de erro
        alert("Erro ao salvar venda: " + (err.error?.message || "Verifique o console."));
      }
    });
  }
}