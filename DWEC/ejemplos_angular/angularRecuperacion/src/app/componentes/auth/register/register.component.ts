import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicios/user.service';
import { dniValido2 } from 'src/app/validaciones/dni-valido';
import { telefonoValido } from 'src/app/validaciones/telefono-valido';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister = this.fb.group({
    nombre: [''],
    apellidos: [''],
    password: ['', [ Validators.minLength(4)]],
    repassword:['',[]],
    email: ['', [Validators.required, Validators.email]],
    dni: ['', [dniValido2()]],
    
  })

  mensajeerr: string=""
  mensaje: string=""
  cuenta: number= 7
  

  constructor(private fb: FormBuilder, private servicioUsuario: UserService, private irHacia: Router) { }

  ngOnInit(): void {
  }
  submit():void{
    if (this.formRegister.value.password == this.formRegister.value.repassword){

      this.servicioUsuario.registrar(this.formRegister.value).subscribe(
        respuesta => {
          console.log(respuesta)
          this.servicioUsuario.guardarToken(respuesta)
          this.mensaje= "FORMULARIO CORRECTO.  Redirigiendo a Perfil"
          
            this.irHacia.navigate(['/perfil'])
          
        },
        error => {
          console.log(error)
          this.mensajeerr= error.error.error

        }
      )

    }

  }
  
  get dniN(){return this.formRegister.get("dni")}
  get tlfN(){return this.formRegister.get("tlf")}
  get emailN(){return this.formRegister.get("email")}
  get passN(){return this.formRegister.get("password")}
  get repassN(){return this.formRegister.get("repassword")}

}
