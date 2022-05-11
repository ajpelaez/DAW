import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from '../empleado.model';
import { EmpleadosService } from '../empleados.service';

@Component({
  selector: 'app-user-page-detail',
  templateUrl: './user-page-detail.component.html',
  styleUrls: ['./user-page-detail.component.css']
})
export class UserPageDetailComponent implements OnInit {

  empleado : any;

  constructor(private route:ActivatedRoute, private empleadosServ:EmpleadosService) {
    let nombre = route.snapshot.params['name'];
    this.empleado = empleadosServ.empleados.find(empleado => empleado.nombre == nombre);

   }

  ngOnInit(): void {
  }

}
