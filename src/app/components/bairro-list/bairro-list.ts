import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Bairro, BairroService } from '../../services/bairro';

@Component({
  selector: 'app-bairro-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bairro-list.html',
  styleUrls: ['./bairro-list.scss']
})
export class BairroList implements OnInit {
  bairros: Bairro[] = [];

  constructor(private bairroService: BairroService) { }

  ngOnInit(): void {
    this.loadBairros();
  }

  loadBairros(): void {
    this.bairroService.getBairros().subscribe(
      data => this.bairros = data,
      error => console.error('Erro ao carregar bairros', error)
    );
  }

  deleteBairro(id: number): void {
    if (confirm('Tem certeza que deseja excluir este bairro?')) {
      this.bairroService.deleteBairro(id).subscribe(
        () => this.loadBairros(),
        error => console.error('Erro ao excluir bairro', error)
      );
    }
  }
}
