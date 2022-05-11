import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-multiplicar',
  templateUrl: './multiplicar.component.html',
  styleUrls: ['./multiplicar.component.css']
})
export class MultiplicarComponent implements OnInit {

  factor: number
  tabla: number[]=[]
  
  constructor(private rutaActiva: ActivatedRoute){}

  

  ngOnInit(): void {
    this.factor = parseInt(this.rutaActiva.snapshot.paramMap.get("factor"))
    if(!isNaN(this.factor)){
      for ( let index = 0; index<11; index++){
        this.tabla.push(this.factor*index)
      }
    }
  }

}
