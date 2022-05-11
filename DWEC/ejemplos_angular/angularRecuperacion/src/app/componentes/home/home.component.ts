import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nombre: string
  apellido: string

  variable: string = "texto de prueba"
  num1: number = 0
  num2: number = 0
  letras = ["a","b","c","d"]
  usuarios = [
    {nombre: "Francisco", apellido: "Domginguez"},
    {nombre: "Sofia", apellido:"Exposito"},
    {nombre: "Javier", apellido:"Ramos"}
  ]
  usuarioSel : any

  
  constructor() { }

  

  ngOnInit(): void {
  }

  selUser(entrada): void{
    this.usuarioSel = entrada
  }
    
  

}
