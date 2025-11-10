import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Marca, MarcaService } from '../../services/marca';
 
@Component({ 
  selector: 'app-marca-list', 
  standalone: true, 
  imports: [CommonModule, RouterLink], 
  templateUrl: './marca-list.html', 
  styleUrls: ['./marca-list.scss'] 
}) 
export class MarcaList implements OnInit { 
  marcas: Marca[] = []; 
 
  constructor(private marcaService: MarcaService) {} 
 
  ngOnInit(): void { 
    this.loadMarcas(); 
  } 
 
  loadMarcas(): void { 
    this.marcaService.getMarcas().subscribe( 
      data => this.marcas = data, 
      error => console.error('Erro ao carregar marcas', error) 
    ); 
  } 
 
  deleteMarca(id: number): void { 
    if (confirm('Tem certeza que deseja excluir este marca?')) { 
      this.marcaService.deleteMarca(id).subscribe( 
        () => this.loadMarcas(), 
        error => console.error('Erro ao excluir marca', error) 
      ); 
    } 
  } 
}