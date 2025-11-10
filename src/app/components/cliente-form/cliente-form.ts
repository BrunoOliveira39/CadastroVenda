import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

// Importa o serviço principal e os DTOs
import { Cliente, ClienteForm, ClienteService } from '../../services/cliente';

// Importa todos os serviços de dependência
import { Sexo, SexoService } from '../../services/sexo';
import { Cidade, CidadeService } from '../../services/cidade';
import { Cep, CepService } from '../../services/cep';
import { Bairro, BairroService } from '../../services/bairro';
import { Rua, RuaService } from '../../services/rua';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cliente-form.html',
  styleUrls: ['./cliente-form.scss'] //
})
export class ClienteFormComponent implements OnInit {
  
  // Modelo principal do formulário
  clienteForm: ClienteForm = {
    nomecliente: '',
    cpf: '',
    datanasc: '',
    numerocasa: '',
    sexo: { codsexo: 0 },
    cidade: { codcidade: 0 },
    cep: { codcep: 0 },
    bairro: { codbairro: 0 },
    rua: { codrua: 0 }
  };

  // Arrays para preencher os dropdowns
  sexos: Sexo[] = [];
  cidades: Cidade[] = [];
  ceps: Cep[] = [];
  bairros: Bairro[] = [];
  ruas: Rua[] = [];

  // Variáveis de estado
  isEdit = false;
  clienteId: number | null = null;

  // Variáveis de controle para os formulários inline
  isAddingRua = false;
  newRuaName = '';
  
  isAddingBairro = false;
  newBairroName = '';
  
  isAddingCep = false;
  newCepNumber = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    // Injeta todos os 6 serviços
    private sexoService: SexoService,
    private cidadeService: CidadeService,
    private cepService: CepService,
    private bairroService: BairroService,
    private ruaService: RuaService
  ) {}

  /**
   * Método principal de inicialização
   */
  ngOnInit(): void {
    // 1. Carrega todos os dropdowns
    this.loadDropdowns();

    // 2. Verifica se a rota é de edição
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.clienteId = +idParam;

      // Se for edição, busca o cliente e preenche o 'clienteForm'
      this.clienteService.getCliente(this.clienteId).subscribe(
        (data: Cliente) => {
          this.clienteForm = {
            nomecliente: data.nomecliente,
            cpf: data.cpf,
            datanasc: this.formatDate(data.datanasc), // Formata a data
            numerocasa: data.numerocasa,
            sexo: { codsexo: data.sexo?.codsexo || 0 },
            cidade: { codcidade: data.cidade?.codcidade || 0 },
            cep: { codcep: data.cep?.codcep || 0 },
            bairro: { codbairro: data.bairro?.codbairro || 0 },
            rua: { codrua: data.rua?.codrua || 0 }
          };
        },
        error => console.error('Erro ao carregar cliente', error)
      );
    }
  }

  /**
   * Carrega os dados para todos os <select>
   */
  loadDropdowns(): void {
    this.sexoService.getSexos().subscribe(data => this.sexos = data);
    this.cidadeService.getCidades().subscribe(data => this.cidades = data);
    this.cepService.getCeps().subscribe(data => this.ceps = data);
    this.bairroService.getBairros().subscribe(data => this.bairros = data);
    this.ruaService.getRuas().subscribe(data => this.ruas = data);
  }
  
  /**
   * Converte a data (string ISO) para o formato YYYY-MM-DD do input type="date"
   */
  private formatDate(date: any): string {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  }

  /**
   * Salva o formulário principal (Criar ou Editar Cliente)
   */
  onSubmit(): void {
    if (this.isEdit && this.clienteId) {
      // Atualiza o cliente
      //
      this.clienteService.updateCliente(this.clienteId, this.clienteForm).subscribe({
        next: () => {
          alert('Cliente atualizado com sucesso!'); // <-- ALERTA ADICIONADO
          this.router.navigate(['/clientes']); //
        },
        error: (error) => console.error('Erro ao atualizar cliente', error) //
      });
    } else {
      // Cria um novo cliente
      //
      this.clienteService.createCliente(this.clienteForm).subscribe({
        next: () => {
          alert('Cliente salvo com sucesso!'); // <-- ALERTA ADICIONADO
          this.router.navigate(['/clientes']); //
        },
        error: (error) => console.error('Erro ao criar cliente', error) //
      });
    }
  }

  // --- MÉTODOS PARA FORMULÁRIO INLINE DA RUA ---
  showAddRuaForm(): void {
    this.isAddingRua = true;
  }
  cancelAddRua(): void {
    this.isAddingRua = false;
    this.newRuaName = '';
  }
  onSaveNewRua(): void {
    if (!this.newRuaName.trim()) return;
    this.ruaService.createRua({ nomerua: this.newRuaName }).subscribe(
      (novaRua) => {
        this.cancelAddRua();
        this.ruas.push(novaRua);
        this.clienteForm.rua.codrua = novaRua.codrua!;
      },
      error => console.error('Erro ao salvar nova rua', error)
    );
  }

  // --- MÉTODOS PARA FORMULÁRIO INLINE DO BAIRRO ---
  showAddBairroForm(): void {
    this.isAddingBairro = true;
  }
  cancelAddBairro(): void {
    this.isAddingBairro = false;
    this.newBairroName = '';
  }
  onSaveNewBairro(): void {
    if (!this.newBairroName.trim()) return;
    this.bairroService.createBairro({ nomebairro: this.newBairroName }).subscribe(
      (novoBairro) => {
        this.cancelAddBairro();
        this.bairros.push(novoBairro);
        this.clienteForm.bairro.codbairro = novoBairro.codbairro!;
      },
      error => console.error('Erro ao salvar novo bairro', error)
    );
  }

  // --- MÉTODOS PARA FORMULÁRIO INLINE DO CEP ---
  showAddCepForm(): void {
    this.isAddingCep = true;
  }
  cancelAddCep(): void {
    this.isAddingCep = false;
    this.newCepNumber = '';
  }
  onSaveNewCep(): void {
    if (!this.newCepNumber.trim()) return;
    this.cepService.createCep({ numerocep: this.newCepNumber }).subscribe(
      (novoCep) => {
        this.cancelAddCep();
        this.ceps.push(novoCep);
        this.clienteForm.cep.codcep = novoCep.codcep!;
      },
      error => console.error('Erro ao salvar novo CEP', error)
    );
  }
}