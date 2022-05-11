import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmpleadoHijoComponent } from './empleado-hijo/empleado-hijo.component';
import { EmpleadosService } from './empleados.service';
import { FakeDataServiceService } from './fake-data-service.service';
import { ServicioEmpService } from './servicio-emp.service';

import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersPageComponent } from './users-page/users-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { RouterModule, Routes } from '@angular/router';
import { UserPageDetailComponent } from './user-page-detail/user-page-detail.component';

const appRoutes:Routes=[
  {path:'', component:HomePageComponent},
  {path:'users', component:UsersPageComponent},
  {path:'users/:name', component:UserPageDetailComponent},
  {path:'contact', component:ContactPageComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    EmpleadoHijoComponent,
    UsersPageComponent,
    ContactPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ServicioEmpService,
    EmpleadosService,
    FakeDataServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
