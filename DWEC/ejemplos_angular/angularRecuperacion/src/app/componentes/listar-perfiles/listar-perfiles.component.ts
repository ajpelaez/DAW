import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/clases/user';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-listar-perfiles',
  templateUrl: './listar-perfiles.component.html',
  styleUrls: ['./listar-perfiles.component.css']
})
export class ListarPerfilesComponent implements OnInit {
  usuarios: any
  usuarioSel: any
  mensaje:''
  formMensajes = this.fb.group({
    idDestinatario: [''],
    mensaje: ['',Validators.required]
  })
  

  constructor(private fb: FormBuilder, private servicioUsuario: UserService, private servicioMensaje: MensajesService) { }

  ngOnInit(): void {
    this.obtenerUsuarios()
  }

  obtenerUsuarios():void{
    this.servicioUsuario.listarUsuarios().subscribe(
      respuesta => {
        console.log(respuesta)
        this.usuarios = respuesta
      },
      error =>console.log(error)
    )
  }

  submit():void{
    this.servicioMensaje.enviarMensaje(this.formMensajes.value).subscribe(
      respuesta=>{
        console.log(respuesta)
        this.formMensajes.reset()
      },
      error =>{
        console.log(error)
        this.mensaje= error.error.error
      }      
    )
  }

}
