import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/servicios/admin.service';

@Component({
  selector: 'app-editar-roles',
  templateUrl: './editar-roles.component.html',
  styleUrls: ['./editar-roles.component.css']
})
export class EditarRolesComponent implements OnInit {

  usuarios: any
  roles: any

  constructor(private servicioAdmin: AdminService) { }

  ngOnInit(): void {
    this.listarUsuarios()
    this.listarRoles()
  }

  listarUsuarios(): void{
    this.servicioAdmin.obtenerUsers().subscribe(
      respuesta =>{
        console.log(respuesta)
        this.usuarios=respuesta
      },
      error => {
        console.log(error)
      }
    )
  }
  listarRoles():void{
    this.servicioAdmin.obtenerRoles().subscribe(
      respuesta => {
        console.log(respuesta)
        this.roles=respuesta
      },
      error => {console.log(error)}
    )
  }
  editarRol(idUsuario:Number, rolSeleccionado:Number ):void{
    let datosActualizados = {id: idUsuario, rolNuevo: rolSeleccionado}
    this.servicioAdmin.editarRol(datosActualizados).subscribe(
      respuesta => {
        console.log(respuesta)
        this.listarUsuarios()
        
      },
      error => {console.log(error)}
    )
  }

}
