import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from './marca'; //
import { Tipo } from './tipo'; //

// Interface para RECEBER dados (corresponde a Produto.java)
export interface Produto {
  codproduto?: number;
  nomeproduto: string;
  valor: number;
  quantidade: number;
  marca: Marca | null;
  tipo: Tipo | null;
}

// Interface para ENVIAR dados (o JSON que o POST/PUT espera)
// No backend, seu ProdutoController e ProdutoService
// esperam o objeto Produto completo, incluindo os objetos aninhados de marca e tipo.
export interface ProdutoForm {
  nomeproduto: string;
  valor: number;
  quantidade: number;
  // Enviamos apenas os IDs, como objetos aninhados
  marca: {
    codmarca: number;
  };
  tipo: {
    codtipo: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:8080/produtos'; //

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  getProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  // O backend espera o objeto Produto completo, mas para o form
  // usaremos um modelo que só tem os IDs. No entanto, a API
  // aceita o formato ProdutoForm (desde que o backend deserialize)
  createProduto(produto: ProdutoForm): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  updateProduto(id: number, produto: ProdutoForm): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto);
  }

  deleteProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}