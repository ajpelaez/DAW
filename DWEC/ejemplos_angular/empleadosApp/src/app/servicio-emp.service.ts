import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioEmpService {

  constructor() { }

  muestraMensaje(mensaje:string){
    alert(mensaje);
  }

}
