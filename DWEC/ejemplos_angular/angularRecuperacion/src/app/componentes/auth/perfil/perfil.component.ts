import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mensaje } from 'src/app/clases/mensaje';
import { User } from 'src/app/clases/user';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { UserService } from 'src/app/servicios/user.service';
import { dniValido2 } from 'src/app/validaciones/dni-valido';
import { telefonoValido } from 'src/app/validaciones/telefono-valido';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfil: User = {}
  mostrarEditar: boolean = false
  formPerfil = this.fb.group({
    nombre: [''],
    apellidos: [''],
    password: ['', [Validators.required, Validators.minLength(4)]],
    repassword:['',[Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    dni: ['', [Validators.required,dniValido2()]],
    telefono: [undefined, [telefonoValido()]] 
  })
  formImage = this.fb.group({
    imagen:["",Validators.required]
  })
  foto: File
  mensajeerr = ""
  mensajesEnv: Mensaje []
  mensajesRec: Mensaje []

  constructor(private servicioUsuario: UserService, private fb: FormBuilder, private irHacia: Router, private servicioMensaje: MensajesService) { }

  ngOnInit(): void {
    this.cargarPerfil()
    this.mostrarMensajesEnviados()
    this.mostrarMensajesRecibidos()
  }

  cargarPerfil():void{
    this.servicioUsuario.obtenerPerfil().subscribe(
      respuesta =>{
        console.log(respuesta)
        this.perfil= respuesta
        this.formPerfil.patchValue(respuesta)

      },
      error => {console.log(error)}
    )
  }
  editarPerfil():void{
    this.servicioUsuario.editarPerfil(this.formPerfil.value).subscribe(
      respuesta => {
        console.log(respuesta)
        this.cargarPerfil()
        this.mostrarEditar = false
      },
      error => console.log(error)
    )
  }
  eliminarUsuario():void{
    this.servicioUsuario.eliminarPerfil().subscribe(
      respuesta => {
        console.log(respuesta)
        this.servicioUsuario.logout()
        this.irHacia.navigate(['/login'])
      },
      error => console.log(error)
    )
  }
  cambiaImagen(evento): void{
    if(evento.taget.files){
      this.formImage.get("imagen").setValue(evento.target.files[0])
    }
  }

  subirImagen():void{
    const formData = new FormData()
    formData.append("imagen", this.formImage.get("imagen").value)
    this.servicioUsuario.subirImagen(formData).subscribe(
      respuesta => {
        console.log(respuesta)

      },
      error => {console.log(error)}
    )
  }
  
  tengoFoto(evento): void{
    if(evento.target.files){
      this.foto = evento.target.files[0]
    }
  }

  subirFoto():void{
    const formData = new FormData()
    formData.append("imagen", this.foto)
    this.servicioUsuario.subirImagen(formData).subscribe(
      respuesta => {
        console.log(respuesta)
        this.cargarPerfil()

      },
      error => {console.log(error)}
    )

  }
  mostrarMensajesRecibidos():void{
    this.servicioMensaje.obtenerMensajesRecibidos().subscribe(
      respuesta => {
        console.log(respuesta)
        this.mensajesRec=respuesta

      },
      error => {
        console.log(error)
        this.mensajeerr= error.error.error
      }
      
    )
      
    
  }
  mostrarMensajesEnviados():void{
    this.servicioMensaje.obtenerMensajesEnviados().subscribe(
      respuesta => {
        console.log(respuesta)
        this.mensajesEnv=respuesta

      },
      error => {
        console.log(error)
        this.mensajeerr= error.error.error
      }
      
    )

  }

}
