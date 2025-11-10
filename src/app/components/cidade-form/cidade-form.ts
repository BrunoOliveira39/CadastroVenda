import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Uf, UfService } from '../../services/uf'; //
import { Cidade, CidadeForm, CidadeService } from '../../services/cidade';

@Component({
  selector: 'app-cidade-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cidade-form.html',
  // styleUrls: ...
})
export class CidadeFormComponent implements OnInit {
  // Usamos o CidadeForm como nosso modelo de formulário
  cidadeForm: CidadeForm = { nomecidade: '', nomeuf: '' };
  ufs: Uf[] = []; // Array para armazenar a lista de UFs
  isEdit = false;
  cidadeId: number | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cidadeService: CidadeService,
    private ufService: UfService // Injeta o UfService
  ) {}

  ngOnInit(): void {
    // 1. Carregar a lista de UFs para o dropdown
    this.loadUfs();

    // 2. Verificar se é modo de edição
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.cidadeId = +idParam;

      // Se for edição, busca a Cidade completa
      this.cidadeService.getCidade(this.cidadeId).subscribe(
        (data: Cidade) => {
          // Converte a Cidade (recebida) para o CidadeForm (modelo do form)
          this.cidadeForm = {
            nomecidade: data.nomecidade,
            nomeuf: data.uf ? data.uf.nomeuf : '' // Pega o nome da UF
          };
        },
        error => console.error('Erro ao carregar cidade', error)
      );
    }
  }

  loadUfs(): void {
    this.ufService.getUfs().subscribe( //
      data => this.ufs = data,
      error => console.error('Erro ao carregar UFs', error)
    );
  }

  onSubmit(): void {
    // Limpa mensagens antigas
    this.successMessage = null;
    this.errorMessage = null;

    if (!this.cidadeForm.nomecidade || !this.cidadeForm.nomeuf) {
      this.errorMessage = "Por favor, preencha todos os campos obrigatórios.";
      return;
    }

    if (this.isEdit && this.cidadeId) {
      // --- Modo Edição ---
      this.cidadeService.updateCidade(this.cidadeId, this.cidadeForm).subscribe({
        next: () => {
          // 1. Define a mensagem de sucesso
          this.successMessage = 'Cidade atualizada com sucesso!';
          
          // 2. Espera 2 segundos e SÓ ENTÃO navega
          setTimeout(() => {
            this.router.navigate(['/cidades']);
          }, 2000); // 2000ms = 2 segundos
        },
        error: (err) => {
          this.errorMessage = 'Erro ao atualizar cidade. Verifique o console.';
          console.error('Erro ao atualizar cidade', err);
        }
      });
    } else {
      // --- Modo Novo ---
      this.cidadeService.createCidade(this.cidadeForm).subscribe({
        next: () => {
          // 1. Define a mensagem de sucesso
          this.successMessage = 'Cidade salva com sucesso!';

          // 2. Espera 2 segundos e SÓ ENTÃO navega
          setTimeout(() => {
            this.router.navigate(['/cidades']);
          }, 2000);
        },
        error: (err) => {
          this.errorMessage = 'Erro ao criar cidade.';
          console.error('Erro ao criar cidade', err);
        }
      });
    }
  }
}