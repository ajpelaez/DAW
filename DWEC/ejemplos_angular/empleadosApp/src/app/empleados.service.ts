import { Injectable } from '@angular/core';
import { Empleado } from './empleado.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {



  empleados:Empleado[]=[

    new Empleado("Juan","Martin","Presidente",5000),
    new Empleado("Maria","Perez","Directora",4000),
    new Empleado("Laura","Robles","Ejecutiva",4000),
    new Empleado("Pedro","Luque","Secretario",2500),


  ];

  constructor() {

  }

  agregarEmpleadoServicio(empleado:Empleado){
    this.empleados.push(empleado);
  }

}
