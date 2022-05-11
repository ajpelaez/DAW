import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-usuarios2',
  templateUrl: './registro-usuarios2.component.html',
  styleUrls: ['./registro-usuarios2.component.css']
})
export class RegistroUsuarios2Component implements OnInit {

  titulo = 'Registro de Usuarios';
  mensaje = "Hola mensaje";
  registrado = false;
  nombre:string="";
  apellido:string="";

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
