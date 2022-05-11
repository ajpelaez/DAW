import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-usuarios3',
  templateUrl: './registro-usuarios3.component.html',
  styleUrls: ['./registro-usuarios3.component.css']
})
export class RegistroUsuarios3Component implements OnInit {

  titulo = 'Registro de Usuarios';
  mensaje = "Hola mensaje";
  registrado = false;
  nombre:string="";
  apellido:string="";
  cargo:string="";

  lenguajes= [
    {titulo:"Python"},
    {titulo:"Java"},
    {titulo:"JavaScript"},
    {titulo:"PHP"},
    {titulo:"C++"},
  ]

  registrarUsuario(){
    this.mensaje="Usuario registrado con éxito";
    this.registrado = true;
  }

  constructor() {

  }

  ngOnInit(): void {
  }

}
