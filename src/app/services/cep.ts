import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
export interface Cep { 
  codcep?: number; 
  numerocep: string; 
} 
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class CepService { 
  private apiUrl = 'http://localhost:8080/ceps'; 
 
  constructor(private http: HttpClient) { } 
 
  getCeps(): Observable<Cep[]> { 
    return this.http.get<Cep[]>(this.apiUrl); 
  } 
 
  getCep(id: number): Observable<Cep> { 
    return this.http.get<Cep>(`${this.apiUrl}/${id}`); 
  } 
 
  createCep(cep: Cep): Observable<Cep> { 
    return this.http.post<Cep>(this.apiUrl, cep); 
  } 
 
  updateCep(id: number, cep: Cep): Observable<Cep> { 
    return this.http.put<Cep>(`${this.apiUrl}/${id}`, cep); 
  } 
 
  deleteCep(id: number): Observable<void> { 
    return this.http.delete<void>(`${this.apiUrl}/${id}`); 
  } 
} 
