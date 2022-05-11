import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/clases/note';
import { NotasService } from 'src/app/servicios/notas.service';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  notas: Note[] = []
  nota: Note = new Note
  notaSeleccionada: Note = new Note
  formNuevo: FormGroup = new FormGroup({
    id: new FormControl(),
    titulo: new FormControl("", Validators.required),
    contenido: new FormControl("", Validators.required)
  })
  busqueda: string = ""
  temporizador: any = null
  creada: boolean = false

  constructor(private servicio: NotasService) { }

  ngOnInit(): void {
    this.obtenerNotas()

  }

  obtenerNotas():void{
    this.servicio.leerNotas().subscribe(
      respuesta =>{
        console.log(respuesta)
        this.notas = respuesta
      },
      error => {console.log(error)}
    )
    
  }
  crearNota(entrada: Note):void{
    this.servicio.insertarNota(entrada).subscribe(
      respuesta =>{
        console.log(respuesta)
        this.obtenerNotas()
        this.creada=true
        setTimeout(() => {this.creada=false 
        }, 1000);
      },
      error=>{console.log(error)}
    )
  }
  /*eliminarNota(): void{
    this.servicio.borrarNota(this.notaSeleccionada.id).subscribe(
      respuesta => {console.log(respuesta)
      this.notaSeleccionada = new Note
      this.obtenerNotas()
      },
      error => {console.log(error)}
    )
  }*/
  
  //Para hacerlo con FormGroup
  eliminarNota(): void{
    this.servicio.borrarNota(this.formNuevo.value.id).subscribe(
      respuesta => {console.log(respuesta)
      this.formNuevo.reset()
      this.obtenerNotas()
      },
      error => {console.log(error)}
    )
  }

  /*editarNota(): void{
    this.servicio.editarNota(this.notaSeleccionada).subscribe(
      respuesta => {
        console.log(respuesta)
        this.notaSeleccionada = new Note
        this.obtenerNotas()
      },
      error => {console.log(error)}
    )
  }*/
  
  //Para hacerlo con FormGroup
  editarNota(): void{
    this.servicio.editarNota(this.formNuevo.value).subscribe(
      respuesta => {
        console.log(respuesta)
        this.notaSeleccionada = new Note
        this.obtenerNotas()
      },
      error => {console.log(error)}
    )
  }
  buscarNota():void{
    this.servicio.buscarNotas(this.busqueda).subscribe(
      respuesta => {
        console.log(respuesta)
        this.notas = respuesta

      },
      error => {console.log(error)}
    )
  }
  buscarConRetraso():void{
    if (this.temporizador == null){
      this.temporizador = setTimeout (() => {this.buscarNota();this.temporizador = null}, 2000)
      
    }
    
  }
}
