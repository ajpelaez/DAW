import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-estructuras',
  templateUrl: './estructuras.component.html',
  styleUrls: ['./estructuras.component.css']
})
export class EstructurasComponent implements OnInit {

  verdad: boolean= false
  edad: number = 0
  num1: number = 0
  num2: number = 0
  operaciones: string[]=["suma" , "resta", "multiplica", "divide"]
  operador: string =""

  usuarios2: Usuario[] = []
  constructor() { }

  ngOnInit(): void {
  }

  muestraLog(entrada:number, impar:boolean, primero:boolean,ultimo:boolean):void{
    console.log("Índice: "+ entrada)
    console.log(impar? "posicion impar" : "posicion par")
    if(primero) console.log("primer elemento")
    if(ultimo)console.log("último elemento")
  }

}
