import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegistroUsuariosComponent } from './registro-usuarios/registro-usuarios.component';
import { RegistroUsuarios2Component } from './registro-usuarios2/registro-usuarios2.component';
import { RegistroUsuarios3Component } from './registro-usuarios3/registro-usuarios3.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuariosComponent,
    RegistroUsuarios2Component,
    RegistroUsuarios3Component
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
