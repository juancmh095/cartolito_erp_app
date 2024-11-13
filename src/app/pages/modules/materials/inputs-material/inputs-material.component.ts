import { Component, NgModule, OnInit } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-inputs-material',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './inputs-material.component.html',
  styleUrl: './inputs-material.component.css'
})
export class InputsMaterialComponent implements OnInit{

  data:any = {};
  isReq:any = false;
  folio:any = 0;

  constructor(private _api:ApiService){}

  ngOnInit(){

  }

  async findOC(){
    if(this.isReq){
      let response = await this._api.get('requisicion',{folio:this.folio});
      console.log('req',response)
    }else{
      let response = await this._api.get('oc',{folio:this.folio});
      console.log('oc',response)
    }
  }
}
