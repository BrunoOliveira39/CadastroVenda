import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Sexo, SexoService } from '../../services/sexo';
 
@Component({ 
  selector: 'app-sexo-form', 
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './sexo-form.html', 
  styleUrls: ['./sexo-form.scss'] 
}) 
export class SexoForm implements OnInit { 
  sexo: Sexo = { nomesexo: '' }; 
  isEdit = false; 
 
  constructor( 
    private route: ActivatedRoute, 
    private router: Router, 
    private sexoService: SexoService 
  ) {} 
 
  ngOnInit(): void { 
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) { 
      this.isEdit = true; 
      this.sexoService.getSexo(+id).subscribe( 
        data => this.sexo = data, 
        error => console.error('Erro ao carregar sexo', error) 
      ); 
    } 
  } 
 
  onSubmit(): void { 
    if (this.isEdit) { 
      
      this.sexoService.updateSexo(this.sexo.codsexo!, this.sexo).subscribe({
        next: () => {
          alert('Sexo atualizado com sucesso!'); 
          this.router.navigate(['/sexos']); 
        },
        error: (error) => console.error('Erro ao atualizar sexo', error) 
      }); 
    } else { 
      
      this.sexoService.createSexo(this.sexo).subscribe({
        next: () => {
          alert('Sexo salvo com sucesso!'); 
          this.router.navigate(['/sexos']); 
        },
        error: (error) => console.error('Erro ao criar sexo', error) 
      }); 
    } 
  }
} 