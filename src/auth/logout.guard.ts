import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const logoutGuard: CanActivateFn = (route, state) => {
  var document = inject(DOCUMENT);
  var val:boolean = false;
  var localStorage:any = document.defaultView?.localStorage;
  if(localStorage){
    let authToken:any = localStorage['token-erp']?localStorage['token-erp']:'';
     val = authToken === null ? true : false;
    console.log('tokenzzxxx', val);
  }

  return val;
};

