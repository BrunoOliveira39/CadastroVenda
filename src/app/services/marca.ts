import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
 
export interface Marca { 
  codmarca?: number; 
  nomemarca: string; 
} 
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class MarcaService { 
  private apiUrl = 'http://localhost:8080/marcas'; 
 
  constructor(private http: HttpClient) { } 
 
  getMarcas(): Observable<Marca[]> { 
    return this.http.get<Marca[]>(this.apiUrl); 
  } 
 
  getMarca(id: number): Observable<Marca> { 
    return this.http.get<Marca>(`${this.apiUrl}/${id}`); 
  } 
 
  createMarca(marca: Marca): Observable<Marca> { 
    return this.http.post<Marca>(this.apiUrl, marca); 
  } 
 
  updateMarca(id: number, marca: Marca): Observable<Marca> { 
    return this.http.put<Marca>(`${this.apiUrl}/${id}`, marca); 
  } 
 
  deleteMarca(id: number): Observable<void> { 
    return this.http.delete<void>(`${this.apiUrl}/${id}`); 
  } 
} 
