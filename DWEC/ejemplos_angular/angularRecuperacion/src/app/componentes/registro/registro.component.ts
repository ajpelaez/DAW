import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { dniValido, dniValido2 } from 'src/app/validaciones/dni-valido';
import { telefonoValido } from 'src/app/validaciones/telefono-valido';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //2 maneras de copletar formularios

  //esta es con FormRegister y tienes qeu poner new FormControl
  formRegister: FormGroup = new FormGroup({
    nombre: new FormControl ("", [Validators.required, Validators.minLength(4)]),
    apellidos: new FormControl ("", [Validators.required]),
    password: new FormControl("", [Validators.required ]),
    email: new FormControl("", [Validators.required]),
    dni: new FormControl("", [Validators.required]),
    tlf: new FormControl(undefined, [Validators.required])

  })

  //esta es con Form builder, donde tienes que cambiar el constructor para que funcione
  formRegister2 = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    dni: ['', [Validators.required,dniValido2()]],
    telefono: [undefined, [Validators.required,telefonoValido()]] 
  })
  //el constructor le asignamos una variable que sea FormBuilder, esta será "fb"
  constructor(private fb:FormBuilder){

  }


  ngOnInit(): void {
  }

  evaluaForm(){
    console.log(this.formRegister.getRawValue());
  
    if (this.formRegister.valid) {
      console.log("Formulario verificado");
    } else {
      console.log("el formulario no se ha podido verificar");
    }
  }
  //esto solo vale para El FormRegister
  //para que valga con el FormBuilder todos los inputs del html deben ser 'class: form-control'
  get dniN(){return this.formRegister.get("dni")}
  get tlfN(){return this.formRegister.get("tlf")}
  get nameN(){return this.formRegister.get("nombre")}
  
  


}
