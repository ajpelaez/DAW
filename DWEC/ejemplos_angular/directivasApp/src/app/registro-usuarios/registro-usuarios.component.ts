import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {

    titulo = 'Registro de Usuarios';
    mensaje = "Hola mensaje";
    registrado = false;
    nombre:string="";
    apellido:string="";

    registrarUsuario(){
      this.mensaje="Usuario registrado con éxito";
      this.registrado = true;
    }

  constructor() { }

  ngOnInit(): void {
  }

}
