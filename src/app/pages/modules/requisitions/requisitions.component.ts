import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../../services/utils.service';
import { ApiService } from '../../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';

declare var $:any;

@Component({
  selector: 'app-requisitions',
  standalone: true,
  imports: [FormsModule,NgFor,CommonModule],
  templateUrl: './requisitions.component.html',
  styleUrl: './requisitions.component.css'
})
export class RequisitionsComponent implements OnInit{

  catalogos:any = {};
  model:any = {};
  product:any = {};
  productNew:any = {};
  listProduct:any = [];
  data:any = [];

  constructor(
    private _utils:UtilsService,
    private _api:ApiService
  ){
    //this._utils.spinner();
  }

  ngOnInit(){
    this.initInput();
    this.getData();
    this.getCatalogue();
  }

  initInput(){
    var t = this;
    $('#producto').selectize({
      create:true,
      onChange: function( value:any ) {
        console.log(value)
        t.product.name = value;
      }
    });

    $('.selectize-input').addClass('form-select');
  }

  async getData(){
    var response = await this._api.get('requisicion',{});
    console.log(response);
    this.data = response.data;
  }

  async getCatalogue(){
    var response = await this._api.get('catalogos',{});
    var data = response.data;
    this.catalogos.cc = data.filter((item:any) => item.name === 'CENTRO_COSTOS')[0]['items']
    this.catalogos.suc = data.filter((item:any) => item.name === 'SUCURSALES')[0]['items']
    this.catalogos.um = data.filter((item:any) => item.name === 'Unidad_Medida')[0]['items']
    this.catalogos.um = data.filter((item:any) => item.name === 'Unidad_Medida')[0]['items']
    console.log(this.catalogos);
  }

  addProduct(){
    console.log(this.product);
    this.listProduct.push(this.product);
    this.product = {};
  }

  async save(form:any){
    console.log(form,this.model);
    this.model.products = this.listProduct;
    var response = await this._api.post('requisicion',this.model);
    console.log(response);
  }

  changeSelectItem(value:any){}
}
