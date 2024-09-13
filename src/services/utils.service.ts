import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


declare var bootstrap:any;
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private _spinner: NgxSpinnerService,
    private _toast: ToastrService
  ) { }

  spinner(){
    this._spinner.show();
  }
  stopSpinner(){
    this._spinner.hide();
  }

  showAlert(type:any,titulo:any,msg:any){
    var opt = {
      closeButton:true,
      progressBar:true
    }
    if(type == 'error'){
      this._toast.error(msg,titulo,opt)
    }else{
      this._toast.success(msg,titulo,opt)
    }
  }

  user(){
    let usr:any = localStorage.getItem('cartolitoUser');
    return JSON.parse(usr);
  }

  userID(){
    let usr:any = localStorage.getItem('cartolitoUserID');
    return usr;
  }

  closeModal(){
    try {
      var btn:any = document.getElementById('close_btn');
      btn.click();

    } catch (error) {
      console.log(error);
    }
  }

  print(divId:any){
    // Obtener el contenido del div a imprimir
    var content = document.getElementById(divId)?.innerHTML;

    // Crear una ventana emergente para la impresión
    var printWindow:any = window.open('', '', 'height=600,width=800');

    // Incluir los estilos de Bootstrap en la ventana emergente
    printWindow.document.write(`
        <html>
        <head>
            <title>Impresión</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body { font-family: Arial, sans-serif; }
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `);

    // Cerrar el documento HTML de la ventana emergente
    printWindow.document.close();

    // Esperar a que la ventana esté completamente cargada antes de imprimir
    printWindow.focus();

    // Ejecutar la impresión
    printWindow.print();

    // Cerrar la ventana emergente después de la impresión
    printWindow.onafterprint = function() {
        printWindow.close();
    };

    
  }
}
