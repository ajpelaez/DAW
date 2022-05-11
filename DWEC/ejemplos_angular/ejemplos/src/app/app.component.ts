import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  //Interpolation
  title = 'ejemplos';
  numeroAleatorio:Number = 10;


  //Variable de plantilla
  user = {edad : 19}
  saludo:String = "";

  saludar(texto:string){
    this.saludo = texto;
  }

  //Property binding
  variable1:Boolean = false;
  variable2:Boolean = true;


  //Event binding
  opcionMarcada:String = "";

  setOption(event:Event){
    alert(event.target);
    //Casting del event
    if((<HTMLInputElement>event.target).value=="opcion1") this.opcionMarcada = "Has marcado la opcion 1"
    else this.opcionMarcada = "Has marcado la opcion 2"

  }

  pulsarBoton(event:Event){
    event?.stopPropagation();
    alert("Has pulsado el boton");
  }


   //Two way binding
  nombre = ""

}
