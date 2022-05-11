import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensaje } from '../clases/mensaje';

const url = 'http://localhost/backendphp/mensajes/'

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(private http: HttpClient) { }

  obtenerMensajesRecibidos():Observable<any>{
    return this.http.get(url)
  }
  obtenerMensajesEnviados():Observable<any>{
    return this.http.get(url + "sent")
  }
  enviarMensaje(mensaje):Observable<any>{
    return this.http.post(url, mensaje)
  }
  editarMensaje(id):Observable<any>{
    return this.http.put(url, id)
  }
  borrarMensaje(id):Observable<any>{
    return this.http.delete(url + id)
  }
}


