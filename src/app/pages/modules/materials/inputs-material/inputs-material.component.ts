import { Component, NgModule, OnInit } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { UtilsService } from '../../../../../services/utils.service';
import { environment } from '../../../../../environments/environment';

declare var document:any;
@Component({
  selector: 'app-inputs-material',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    CurrencyPipe,
    NgIf,
    DatePipe
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
  dataEntry:any = [];
  api:any = environment.api;

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
      this.dataEntry = responseE.data;
      console.log('req',response,responseE)
      this.data = response.data[0];
    }else{
      let response = await this._api.get('oc',{folio:this.folio});
      let responseE = await this._api.get('oc/materiales',{folioOC:this.folio});
      this.dataEntry = responseE.data;
      this.data = response.data[0];
      console.log('oc',response,responseE)
    }
    this.data.products = this.data.products.map((item:any)=>{
      item.rec = ''
      return item;
    });

    for (let i = 0; i < this.data.products.length; i++) {
      const element = this.data.products[i];
      for (let x = 0; x < this.dataEntry.length; x++) {
        const e = this.dataEntry[x];
        for (let y = 0; y < e.entrys.length; y++) {
          const p = e.entrys[y];
          if(element._id == p._id){
            element.recibido = (element.recibido?element.recibido:0) + p.quantity;
          }
        }
      }
    }

    console.log(this.data.products);
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
    if(response.status){
      this._utils.showAlert('success','Entrada',response.text);
      this.findOC();
      document.getElementById('evidencia').value = '';
      document.getElementById('factura').value = '';

    }else{
      this._utils.showAlert('Error','Entrada',response.text)
    }
    console.log(response);
  }
}
