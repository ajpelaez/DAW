import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../servicios/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserRouterGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(this.servicioUsuario.isLoged())return true;
      else{
        this.irHacia.navigate(["/login"])
        return false
      }
      
      ;
  }
  
  constructor( private servicioUsuario: UserService, private irHacia: Router){}
}
