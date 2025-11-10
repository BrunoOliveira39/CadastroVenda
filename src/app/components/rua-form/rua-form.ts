import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Rua, RuaService } from '../../services/rua';
 
@Component({ 
  selector: 'app-rua-form', 
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './rua-form.html', 
  styleUrls: ['./rua-form.scss'] 
}) 
export class RuaForm implements OnInit { 
  rua: Rua = { nomerua: '' }; 
  isEdit = false; 
 
  constructor( 
    private route: ActivatedRoute, 
    private router: Router, 
    private ruaService: RuaService 
  ) {} 
 
  ngOnInit(): void { 
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) { 
      this.isEdit = true; 
      this.ruaService.getRua(+id).subscribe( 
        data => this.rua = data, 
        error => console.error('Erro ao carregar rua', error) 
      ); 
    } 
  } 
 
  onSubmit(): void { 
    if (this.isEdit) { 
      //
      this.ruaService.updateRua(this.rua.codrua!, this.rua).subscribe({
        next: () => {
          alert('Rua atualizada com sucesso!'); 
          this.router.navigate(['/ruas']); 
        },
        error: (error) => console.error('Erro ao atualizar rua', error) //
      }); 
    } else { 
      //
      this.ruaService.createRua(this.rua).subscribe({
        next: () => {
          alert('Rua salva com sucesso!'); 
          this.router.navigate(['/ruas']); 
        },
        error: (error) => console.error('Erro ao criar rua', error) //
      }); 
    } 
  }
} 