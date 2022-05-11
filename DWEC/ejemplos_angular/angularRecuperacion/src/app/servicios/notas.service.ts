import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../clases/note';

const url = 'http://localhost/backendphp/notas/'

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(private http: HttpClient) { }

  leerNotas():Observable<any>{
    return this.http.get(url)
  }
  leerNota(id: number):Observable<any>{
    return this.http.get(url + id)
  }
  insertarNota(nota: Note): Observable<any>{
    return this.http.post(url,nota)
  }
  borrarNota(id: number): Observable<any>{
    return this.http.delete(url+id)
  }
  editarNota(nota: Note): Observable<any>{
    return this.http.put(url,nota)
  }
  buscarNotas(entrada: string): Observable<any>{
    return this.http.get(url+"?busqueda="+entrada)
  }
}
