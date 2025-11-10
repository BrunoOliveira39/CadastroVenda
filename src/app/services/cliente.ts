import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sexo } from './sexo';   //
import { Cidade } from './cidade'; //
import { Cep } from './cep';     //
import { Bairro } from './bairro'; //
import { Rua } from './rua';     //

// Interface para RECEBER dados (corresponde a Cliente.java)
export interface Cliente {
  codcliente?: number;
  nomecliente: string;
  cpf: string;
  datanasc: string; // Vem como string ISO (ex: "1990-10-20T00:00:00...")
  numerocasa: string;
  sexo: Sexo | null;
  cidade: Cidade | null;
  cep: Cep | null;
  bairro: Bairro | null;
  rua: Rua | null;
}

// Interface para ENVIAR dados (JSON que o POST/PUT espera)
export interface ClienteForm {
  nomecliente: string;
  cpf: string;
  datanasc: string; // Vamos enviar como string YYYY-MM-DD
  numerocasa: string;
  // Enviamos apenas os IDs, como objetos aninhados
  sexo: { codsexo: number };
  cidade: { codcidade: number };
  cep: { codcep: number };
  bairro: { codbairro: number };
  rua: { codrua: number };
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/clientes'; //

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  createCliente(cliente: ClienteForm): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  updateCliente(id: number, cliente: ClienteForm): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}