import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generar-loteria',
  templateUrl: './generar-loteria.component.html',
  styleUrls: ['./generar-loteria.component.css']
})
export class GenerarLoteriaComponent implements OnInit {

  digito: number

  constructor() { }

  ngOnInit(): void {
    
  }

  obtenAleatorio(): void{
    this.digito = Math.floor(Math.random()*(9))
  }

}
