import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FakeDataServiceService {

  constructor(private http: HttpClient) {
    this.http.get('https://reqres.in/api/users?page=2');
   }


   /*
   getUsers(){
    this.http.get('https://reqres.in/api/users?page=2').subscribe(data => {
      console.log(data);
    });
    console.log("Esto se ejecutará antes que el console log de arriba");
  }*/

  getUsers(): Observable<any>{
    return this.http.get('https://reqres.in/api/users?page=2');
  }


}
