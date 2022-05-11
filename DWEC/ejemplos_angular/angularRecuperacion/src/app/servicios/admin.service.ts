import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
const url = "http://localhost/backendphp/admin/"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private servicioUsuario: UserService) { }

  obtenerUsers(): Observable<any>{
    return this.http.get(url)
  }
  obtenerRoles(): Observable<any>{
    return this.http.get(url + "roles")
  }
  editarRol(entrada): Observable<any>{
    return this.http.put(url, entrada)
  }
  isAdmin():boolean{
    let rolToken = this.servicioUsuario.leerToken()
    let parte = rolToken.split("?")
    return parte[1] == "14"
  }
}
