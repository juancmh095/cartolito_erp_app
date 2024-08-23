import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private _spinner: NgxSpinnerService) { }

  spinner(){
    this._spinner.show();
  }
  stopSpinner(){
    this._spinner.hide();
  }
}
