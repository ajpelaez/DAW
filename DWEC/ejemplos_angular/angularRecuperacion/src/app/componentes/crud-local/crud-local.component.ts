import { Component, OnInit } from '@angular/core';
import { Nota } from 'src/app/clases/nota';

@Component({
  selector: 'app-crud-local',
  templateUrl: './crud-local.component.html',
  styleUrls: ['./crud-local.component.css']
})
export class CrudLocalComponent implements OnInit {

  notaNueva: Nota = new Nota
  notas: Nota[]=[]
  indice: number
  notaSelecionada: Nota = new Nota

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem("Crudlocal")!=null){
      this.notas = JSON.parse(localStorage.getItem("Crudlocal"))
      console.log(this.notas)
      this.indice = this.notas[this.notas.length-1].id+1
    }else this.indice=0

    
  }
  insertarNota(): void{
    
    this.notaNueva.id = this.indice
    this.indice++
    this.notas.push(this.notaNueva)
    this.notaNueva = new Nota()

    localStorage.setItem("Crudlocal", JSON.stringify(this.notas))
  }

  editarNota(notaEntrada: Nota):void{
    for (let i in this.notas){
      if(this.notas[i].id == notaEntrada.id){
        this.notas[i]=notaEntrada
        localStorage.setItem("CrudLocal",JSON.stringify(this.notas))

        this.notaSelecionada = new Nota
      }
    }
  }
  borrarNota(notaEntrada: Nota): void{
    if (confirm("¿Desea Borrar la nota la con titutlo '"+ notaEntrada.titulo)){
      for (let i in this.notas){
        if(this.notas[i].id == notaEntrada.id){
          delete this.notas[i]
          localStorage.setItem("CrudLocal",JSON.stringify(this.notas))
          

          this.notaSelecionada = new Nota
        }
      }
    }
      
  }

}
