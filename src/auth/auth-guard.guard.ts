import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilsService } from '../services/utils.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router:Router,
    private _utils:UtilsService
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.isLoggedIn() !== true) {
      this._utils.showAlert('error','Error de sesion','Acceso no autorizado');
      this.router.navigate(['/login']);
      return true;
    }
    return true;
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('cartolitoToken');
    return authToken !== null ? true : false;
  }
}
