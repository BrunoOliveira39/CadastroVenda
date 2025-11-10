import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Uf, UfService } from '../../services/uf';
 
@Component({ 
  selector: 'app-uf-form', 
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './uf-form.html', 
  styleUrls: ['./uf-form.scss'] 
}) 
export class UfForm implements OnInit { 
  uf: Uf = { nomeuf: '', sigla: '' }; 
  isEdit = false; 
 
  constructor( 
    private route: ActivatedRoute, 
    private router: Router, 
    private ufService: UfService 
  ) {} 
 
  ngOnInit(): void { 
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) { 
      this.isEdit = true; 
      this.ufService.getUf(+id).subscribe( 
        data => this.uf = data, 
        error => console.error('Erro ao carregar uf', error) 
      ); 
    } 
  } 
 
  onSubmit(): void { 
    if (this.isEdit) { 
      
      this.ufService.updateUf(this.uf.coduf!, this.uf).subscribe({
        next: () => {
          alert('UF atualizada com sucesso!'); 
          this.router.navigate(['/ufs']); 
        },
        error: (error) => console.error('Erro ao atualizar uf', error) 
      }); 
    } else { 
      
      this.ufService.createUf(this.uf).subscribe({
        next: () => {
          alert('UF salva com sucesso!'); 
          this.router.navigate(['/ufs']); 
        },
        error: (error) => console.error('Erro ao criar uf', error) 
      }); 
    } 
  }
} 
