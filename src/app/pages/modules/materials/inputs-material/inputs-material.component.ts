import { Component, NgModule, OnInit } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { UtilsService } from '../../../../../services/utils.service';

@Component({
  selector: 'app-inputs-material',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    CurrencyPipe,
    NgIf
  ],
  templateUrl: './inputs-material.component.html',
  styleUrl: './inputs-material.component.css'
})
export class InputsMaterialComponent implements OnInit{

  data:any = {};
  isReq:any = false;
  folio:any = '';
  notFact:any = false;
  user:any = ''

  constructor(
    private _api:ApiService,
    private _utils:UtilsService
  ){}

  ngOnInit(){
    this.user = this._utils.userID();
    console.log(this.user);
  }

  async findOC(){
    if(this.isReq){
      let response = await this._api.get('requisicion',{folio:this.folio});
      let responseE = await this._api.get('oc/materiales',{folioReq:this.folio});
      console.log('req',response,responseE)
      this.data = response.data[0];
    }else{
      let response = await this._api.get('oc',{folio:this.folio});
      let responseE = await this._api.get('oc/materiales',{folioOC:this.folio});
      this.data = response.data[0];
      console.log('oc',response,responseE)
    }
    this.data.products = this.data.products.map((item:any)=>{
      item.rec = 0
      return item;
    })
  }

  async loadFile($event:any,type:any){
    const file:any = $event.target.files[0];
    console.log(file)
    if(file){
      const base64 = await this._utils.convertFileToBase64(file);
      if(type == 'ev'){
        this.data.evidence = base64;
        this.data.evidenceName = file.name;
        this.data.evidenceFileSize = file.size;

      }else{
        this.data.fact = base64;
        this.data.factName = file.name;
        this.data.factFileSize = file.size;
      }
    }
  }

  async save(){
    this.data.notFact = this.notFact;
    this.data.folio = this.folio;
    this.data.userx = this.user;
    this.data.isReq = this.isReq;
    console.log(this.data);

    let response = await this._api.post('oc/materiales',this.data);
    console.log(response);
  }
}
