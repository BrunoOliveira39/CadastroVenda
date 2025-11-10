import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Importa as interfaces que serão aninhadas na resposta
import { Cliente } from './cliente';


// --- Interfaces para ENVIAR dados (DTOs) ---
// Corresponde a ItemVendaForm.java
export interface ItemVendaForm {
  produtoId: number;
  quantidade: number;
}

// Corresponde a VendaForm.java
export interface VendaForm {
  clienteId: number;
  itens: ItemVendaForm[];
}

// --- Interfaces para RECEBER dados (Respostas da API) ---
// Corresponde à resposta do Produto dentro da Venda
interface ProdutoVenda {
  codproduto: number;
  nomeproduto: string;
  valor: number;
  // Não inclui a 'quantidade' do estoque, como discutimos
}

// Corresponde à resposta do Item da Venda (VendaProduto.java)
export interface VendaItem {
  id: {
    codvendafk: number;
    codprodutofk: number;
  };
  produto: ProdutoVenda;
  quantidadeVendida: number;
  valorVenda: number; // Este é o valor total (Qtd * Preço)
}

// Corresponde à resposta da Venda (Venda.java)
export interface Venda {
  codvenda: number;
  datavenda: string;
  cliente: Cliente; // Reutiliza a interface Cliente
  itens: VendaItem[];
}


@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private apiUrl = 'http://localhost:8080/vendas'; //

  constructor(private http: HttpClient) { }

  getVendas(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.apiUrl);
  }

  getVenda(id: number): Observable<Venda> {
    return this.http.get<Venda>(`${this.apiUrl}/${id}`);
  }

  // Envia o DTO VendaForm
  createVenda(vendaForm: VendaForm): Observable<Venda> {
    return this.http.post<Venda>(this.apiUrl, vendaForm);
  }

  // Usa o service que já implementamos no backend
  deleteVenda(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}