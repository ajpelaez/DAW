import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-formulario-clase',
  templateUrl: './formulario-clase.component.html',
  styleUrls: ['./formulario-clase.component.css']
})
export class FormularioClaseComponent implements OnInit {

user: Usuario = new Usuario
users: Usuario[]=[]

  constructor() { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void{

    alert("Hasta luego chaval")
  }

  insertar():void{
    this.users.push(this.user)
    this.user= new Usuario
    localStorage.setItem("backup", JSON.stringify(this.users))
    
  }
  alerta(name:string):void{
    alert("Yo soy " + name)
  }

}
