import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Produto, ProdutoForm, ProdutoService } from '../../services/produto';
import { Marca, MarcaService } from '../../services/marca'; //
import { Tipo, TipoService } from '../../services/tipo'; //

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './produto-form.html',
  // styleUrls: ...
})
export class ProdutoFormComponent implements OnInit {
  // O modelo do formulário
  produtoForm: ProdutoForm = {
    nomeproduto: '',
    valor: 0,
    quantidade: 0,
    marca: { codmarca: 0 },
    tipo: { codtipo: 0 }
  };

  marcas: Marca[] = []; // Array para o dropdown de Marcas
  tipos: Tipo[] = [];  // Array para o dropdown de Tipos

  isEdit = false;
  produtoId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private marcaService: MarcaService, // Injeta o serviço
    private tipoService: TipoService    // Injeta o serviço
  ) {}

  ngOnInit(): void {
    // 1. Carregar os dropdowns
    this.loadMarcas();
    this.loadTipos();

    // 2. Verificar se é modo de edição
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.produtoId = +idParam;

      this.produtoService.getProduto(this.produtoId).subscribe(
        (data: Produto) => {
          // Converte o Produto (recebido) para o ProdutoForm (modelo do form)
          this.produtoForm = {
            nomeproduto: data.nomeproduto,
            valor: data.valor,
            quantidade: data.quantidade,
            marca: { codmarca: data.marca?.codmarca || 0 },
            tipo: { codtipo: data.tipo?.codtipo || 0 }
          };
        },
        error => console.error('Erro ao carregar produto', error)
      );
    }
  }

  loadMarcas(): void {
    this.marcaService.getMarcas().subscribe( //
      data => this.marcas = data,
      error => console.error('Erro ao carregar Marcas', error)
    );
  }

  loadTipos(): void {
    this.tipoService.getTipos().subscribe( //
      data => this.tipos = data,
      error => console.error('Erro ao carregar Tipos', error)
    );
  }

  onSubmit(): void {
    if (this.isEdit && this.produtoId) {
      //
      this.produtoService.updateProduto(this.produtoId, this.produtoForm).subscribe({
        next: () => {
          alert('Produto atualizado com sucesso!'); // <-- ALERTA ADICIONADO
          this.router.navigate(['/produtos']); //
        },
        error: (error) => console.error('Erro ao atualizar produto', error) //
      });
    } else {
      //
      this.produtoService.createProduto(this.produtoForm).subscribe({
        next: () => {
          alert('Produto salvo com sucesso!'); // <-- ALERTA ADICIONADO
          this.router.navigate(['/produtos']); //
        },
        error: (error) => console.error('Erro ao criar produto', error) //
      });
    }
  }
}