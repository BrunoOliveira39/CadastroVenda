import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cep, CepService } from '../../services/cep';
 
@Component({ 
  selector: 'app-cep-form', 
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './cep-form.html', 
  styleUrls: ['./cep-form.scss'] 
}) 
export class CepForm implements OnInit { 
  cep: Cep = { numerocep: '' }; 
  isEdit = false; 
 
  constructor( 
    private route: ActivatedRoute, 
    private router: Router, 
    private cepService: CepService 
  ) {} 
 
  ngOnInit(): void { 
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) { 
      this.isEdit = true; 
      this.cepService.getCep(+id).subscribe( 
        data => this.cep = data, 
        error => console.error('Erro ao carregar cep', error) 
      ); 
    } 
  } 
 
  onSubmit(): void { 
    if (this.isEdit) { 
      //
      this.cepService.updateCep(this.cep.codcep!, this.cep).subscribe({
        next: () => {
          alert('CEP atualizado com sucesso!'); // <-- ALERTA ADICIONADO
          this.router.navigate(['/ceps']); //
        },
        error: (error) => console.error('Erro ao atualizar cep', error) //
      }); 
    } else { 
      //
      this.cepService.createCep(this.cep).subscribe({
        next: () => {
          alert('CEP salvo com sucesso!'); // <-- ALERTA ADICIONADO
          this.router.navigate(['/ceps']); //
        },
        error: (error) => console.error('Erro ao criar cep', error) //
      }); 
    } 
  }
} 