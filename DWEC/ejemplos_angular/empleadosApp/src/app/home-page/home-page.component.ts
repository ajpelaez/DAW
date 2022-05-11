import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleado.model';
import { EmpleadosService } from '../empleados.service';
import { FakeDataServiceService } from '../fake-data-service.service';
import { ServicioEmpService } from '../servicio-emp.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  titulo = 'Listado de empleados';
  users:any;

  constructor(private miServicio:ServicioEmpService, private empleadosServ:EmpleadosService, private fakeDataServ:FakeDataServiceService) {
    this.empleados = empleadosServ.empleados;
   }

  ngOnInit() {
    this.fakeDataServ.getUsers().subscribe(data => {
      this.users = data.data;
      console.log(data.data);
    });
  }

  empleados:Empleado[];

  cuadroNombre:string="";
  cuadroApellido:string="";
  cuadroCargo:string="";
  cuadroSalario:number=0;

  agregarEmpleado(){
    let empleado:Empleado;
    empleado = new Empleado(this.cuadroNombre, this.cuadroApellido, this.cuadroCargo, this.cuadroSalario);
    this.miServicio.muestraMensaje("Nombre del empleado: " + empleado.nombre);
    this.empleadosServ.agregarEmpleadoServicio(empleado);
  }


}
