import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Uf } from './uf'; // Importa a interface Uf

// Interface para RECEBER dados (corresponde a Cidade.java)
export interface Cidade {
  codcidade?: number;
  nomecidade: string;
  uf: Uf | null; // A UF vem como um objeto aninhado
}

// Interface para ENVIAR dados (corresponde a CidadeForm.java)
export interface CidadeForm {
  nomecidade: string;
  nomeuf: string; // Enviamos apenas o nome/sigla da UF
}

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  // A API espera por /cidades
  private apiUrl = 'http://localhost:8080/cidades';

  constructor(private http: HttpClient) { }

  getCidades(): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(this.apiUrl);
  }

  getCidade(id: number): Observable<Cidade> {
    
    return this.http.get<Cidade>(`${this.apiUrl}/${id}`);
  }

  createCidade(cidadeForm: CidadeForm): Observable<Cidade> {
    // Envia o DTO (Form)
    return this.http.post<Cidade>(this.apiUrl, cidadeForm);
  }

  updateCidade(id: number, cidadeForm: CidadeForm): Observable<Cidade> {
    // Envia o DTO (Form)
    return this.http.put<Cidade>(`${this.apiUrl}/${id}`, cidadeForm);
  }

  deleteCidade(id: number): Observable<void> {
    
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}