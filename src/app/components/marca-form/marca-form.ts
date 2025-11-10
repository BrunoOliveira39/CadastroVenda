import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Marca, MarcaService } from '../../services/marca';
 
@Component({ 
  selector: 'app-marca-form', 
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './marca-form.html', 
  styleUrls: ['./marca-form.scss'] 
}) 
export class MarcaForm implements OnInit { 
  marca: Marca = { nomemarca: '' }; 
  isEdit = false; 
 
  constructor( 
    private route: ActivatedRoute, 
    private router: Router, 
    private marcaService: MarcaService 
  ) {} 
 
  ngOnInit(): void { 
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) { 
      this.isEdit = true; 
      this.marcaService.getMarca(+id).subscribe( 
        data => this.marca = data, 
        error => console.error('Erro ao carregar marca', error) 
      ); 
    } 
  } 
 
  onSubmit(): void { 
    if (this.isEdit) { 
      //
      this.marcaService.updateMarca(this.marca.codmarca!, this.marca).subscribe({
        next: () => {
          alert('Marca atualizada com sucesso!'); // <-- ALERTA ADICIONADO
          this.router.navigate(['/marcas']); //
        },
        error: (error) => console.error('Erro ao atualizar marca', error) //
      }); 
    } else { 
      //
      this.marcaService.createMarca(this.marca).subscribe({
        next: () => {
          alert('Marca salva com sucesso!'); // <-- ALERTA ADICIONADO
          this.router.navigate(['/marcas']); //
        },
        error: (error) => console.error('Erro ao criar marcas', error) //
      }); 
    } 
  }
} 