import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { environment } from '../environments/environment';


declare var Swal:any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  urlApi:any = environment.api;

  constructor(public _http:HttpClient, private _utils:UtilsService) { }


  //falta agregar el user en todos
  post(url:any, body:any): Promise<any> {
    this._utils.spinner();
    return new Promise((resolve:any)=>{
      try {
        body.user = null;
        this._http.post(this.urlApi + url,body).subscribe((resultado:any)=>{
          this._utils.stopSpinner();
          resolve(resultado);
        }, xhr => {
          console.log(xhr);
        });
      } catch (error) {
        this._utils.stopSpinner();
        resolve(error)
      }
    })
  }

  delete(url:any, body:any): Promise<any> {
    return new Promise((resolve:any)=>{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Eliminar '+url,
      text: 'Confirme que desea continuar con la solicitud',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result:any) => {
      if (result.isConfirmed) {
        this._utils.spinner();
          try {
            body.user = null;
            this._http.delete(this.urlApi + url,{body:body}).subscribe((resultado:any)=>{
              this._utils.stopSpinner();
              resolve(resultado);
            }, xhr => {
              console.log(xhr);
            });
          } catch (error) {
            this._utils.stopSpinner();
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelado',
              'Soliciitud cancelada!',
              'error'
              )
              resolve(result)
            }
          })
      })
  }

  put(url:any, body:any): Promise<any> {
    return new Promise((resolve:any)=>{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Actualizar '+url,
      text: 'Confirme que desea continuar con la solicitud',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result:any) => {
      if (result.isConfirmed) {
        this._utils.spinner();
          try {
            body.user = null;
            this._http.put(this.urlApi + url,body).subscribe((resultado:any)=>{
              this._utils.stopSpinner();
              resolve(resultado);
            }, xhr => {
              console.log(xhr);
            });
          } catch (error) {
            this._utils.stopSpinner();
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelado',
              'Soliciitud cancelada!',
              'error'
              )
              resolve(result)
            }
          })
      })
  }

  get(url:any, params:any): Promise<any> {
    var filters = JSON.stringify(params);
    this._utils.spinner();
    return new Promise((resolve:any)=>{
      try {
        this._http.get(this.urlApi + url,{params:{filters}}).subscribe((resultado:any)=>{
          this._utils.stopSpinner();
          resolve(resultado);
        });
      } catch (error) {
        this._utils.stopSpinner();
        resolve(error);
      }
    })
  }

}
