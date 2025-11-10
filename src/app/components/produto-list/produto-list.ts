import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Produto, ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './produto-list.html',
  // styleUrls: ...
})
export class ProdutoList implements OnInit {
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      data => this.produtos = data,
      error => console.error('Erro ao carregar produtos', error)
    );
  }

  deleteProduto(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.deleteProduto(id).subscribe(
        () => this.loadProdutos(),
        error => console.error('Erro ao excluir produto', error)
      );
    }
  }
}