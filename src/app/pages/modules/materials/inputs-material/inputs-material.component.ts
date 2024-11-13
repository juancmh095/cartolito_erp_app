import { Component, NgModule, OnInit } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CurrencyPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-inputs-material',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    CurrencyPipe
  ],
  templateUrl: './inputs-material.component.html',
  styleUrl: './inputs-material.component.css'
})
export class InputsMaterialComponent implements OnInit{

  data:any = {};
  isReq:any = false;
  folio:any = '';

  constructor(private _api:ApiService){}

  ngOnInit(){

  }

  async findOC(){
    if(this.isReq){
      let response = await this._api.get('requisicion',{folio:this.folio});
      console.log('req',response)
      this.data = response.data[0];
    }else{
      let response = await this._api.get('oc',{folio:this.folio});
      this.data = response.data[0];
      console.log('oc',response)
    }
    this.data.items = this.data.items.map((item:any)=>{
      item.rec = 0
      return item;
    })
  }
}
