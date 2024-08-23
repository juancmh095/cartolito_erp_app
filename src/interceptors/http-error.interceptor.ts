import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilsService } from '../services/utils.service';

declare var Swal:any;


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private _utils:UtilsService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMsg = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this._utils.stopSpinner();

        Swal.fire({
          title: "Sin Conexión",
          text: errorMsg,
          icon: "warning"
        });
        // Log the error or display a notification
        // Optionally show user-friendly error messages using a service (e.g., ToastService)
        // this.toastService.error(errorMsg);

        return throwError(errorMsg);
      })
    );
  }
}
