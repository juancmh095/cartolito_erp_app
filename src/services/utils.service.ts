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
}
