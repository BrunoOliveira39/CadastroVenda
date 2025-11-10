import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cep, CepService } from '../../services/cep';
 
@Component({ 
  selector: 'app-cep-list', 
  standalone: true, 
  imports: [CommonModule, RouterLink], 
  templateUrl: './cep-list.html', 
  styleUrls: ['./cep-list.scss'] 
}) 
export class CepList implements OnInit { 
  ceps: Cep[] = []; 
 
  constructor(private cepService: CepService) {} 
 
  ngOnInit(): void { 
    this.loadCeps(); 
  } 
 
  loadCeps(): void { 
    this.cepService.getCeps().subscribe( 
      data => this.ceps = data, 
      error => console.error('Erro ao carregar ceps', error) 
    ); 
  } 
 
  deleteCep(id: number): void { 
    if (confirm('Tem certeza que deseja excluir este cep?')) { 
      this.cepService.deleteCep(id).subscribe( 
        () => this.loadCeps(), 
        error => console.error('Erro ao excluir cep', error) 
      ); 
    } 
  } 
}