import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Venda, VendaService } from '../../services/venda';

@Component({
  selector: 'app-venda-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './venda-list.html',
  // styleUrls: ...
})
export class VendaList implements OnInit {
  vendas: Venda[] = [];

  constructor(private vendaService: VendaService) {}

  ngOnInit(): void {
    this.loadVendas();
  }

  loadVendas(): void {
    this.vendaService.getVendas().subscribe(
      data => this.vendas = data,
      error => console.error('Erro ao carregar vendas', error)
    );
  }

  deleteVenda(id: number): void {
    if (confirm('Tem certeza que deseja EXCLUIR E REVERTER O ESTOQUE desta venda?')) {
      this.vendaService.deleteVenda(id).subscribe(
        () => this.loadVendas(),
        error => console.error('Erro ao excluir venda', error)
      );
    }
  }

  // Helper para calcular o valor total da venda (somando os itens)
  calcularTotalVenda(venda: Venda): number {
    return venda.itens.reduce((total, item) => total + item.valorVenda, 0);
  }
}