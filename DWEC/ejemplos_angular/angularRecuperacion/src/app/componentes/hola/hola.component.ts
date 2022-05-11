import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hola',
  templateUrl: './hola.component.html',
  styleUrls: ['./hola.component.css']
})
export class HolaComponent implements OnInit {

  nombre: string
  apellido: string

  constructor(private miRuta:ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.nombre = this.miRuta.snapshot.paramMap.get("nombre")
    this.apellido = this.miRuta.snapshot.paramMap.get("apellido")
  }

}
