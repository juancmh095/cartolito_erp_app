import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logoutGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  var document = inject(DOCUMENT);
  var val:boolean = false;
  var localStorage:any = document.defaultView?.localStorage;
  if(localStorage){
    let authToken:any = localStorage['cartolitoToken']?localStorage['cartolitoToken']:null;
     val = authToken === null ? true : false;
    console.log('tokenzzxxx', val);

    if(!val){
      router.navigate(['/erp']);
    }
  }

  return val;
};

