import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.isLoggedIn() !== true) {
      //this._utils.alert('Error de sesion','Acceso no autorizado','error');
      //this.router.navigate(['/login']);
      return true;
    }
    return true;
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token-erp');
    return authToken !== null ? true : false;
  }
}
