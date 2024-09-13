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

  modulo:string = 'Requisición';
  catalogos:any = {};
  model:any = {};
  product:any = {};
  productNew:any = {};
  listProduct:any = [];
  data:any = [];
  Asing:any = false;
  AsingId:any = '';
  user:any = {};
  users:any = [];
  userID:any = '';
  itemSelect:any = '';
  today:any;
  filtro:any = {};
  requisicion:any = {};

  constructor(
    private _utils:UtilsService,
    private _api:ApiService
  ){
    //this._utils.spinner();
  }

  ngOnInit(){
    this.initInput();
    this.getData();
    this.getUser();
    this.getCatalogue();
    this.getToday();
    this.user = this._utils.user();
    this.userID = this._utils.userID();
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

  getToday(){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Meses en JavaScript van de 0 a 11
    const day = String(currentDate.getDate()).padStart(2, '0');

    this.today = `${year}-${month}-${day}`;
    this.model.waitDate = this.today;
  }

  async getData(){
    var response = await this._api.get('requisicion',{delete:false});
    console.log(response);
    this.data = response.data;
  }

  async getDataAsing(){
    var response = await this._api.get('requisicion',{asing:this.userID,delete:false});
    console.log(response);
    this.data = response.data;
  }

  async getUser() {
    var response = await this._api.get('usuarios',{delete:false});
    this.users = response.data;
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

  async asignar() {
    var response = await this._api.put('requisicion',{_id: this.itemSelect, asing:this.AsingId});
    if(response.status){
      this._utils.showAlert('success',this.modulo,response.text)
    }
  }

  async updateStatus(id:any,status:any) {
    var response = await this._api.put('requisicion',{_id: id, status:status, auth: this.userID});
    if(response.status){
      this._utils.showAlert('success',this.modulo,response.text)
      if(this.Asing){
        this.getDataAsing();
      }else{
        this.getData();
      }
    }
  }

  async update(id:any,item:any) {
    item._id = id;
    var response = await this._api.put('requisicion',item);
    if(response.status){
      this._utils.showAlert('success',this.modulo,response.text)
      if(this.Asing){
        this.getDataAsing();
      }else{
        this.getData();
      }
    }
  }

  print(){
    console.log($(),window);
    this._utils.print('myTabContent');
    
  }

  async save(form:any){
    console.log(form,this.model);
    this.model.producedBy = this.userID;
    this.model.products = this.listProduct;
    this.model.departmentId = this.user.department;
    var response = await this._api.post('requisicion',this.model);
    console.log(response);

    if(response.status){
      this._utils.showAlert('success',this.modulo,response.text)
      this._utils.closeModal();
      this.model = {};
      if(this.Asing){
        this.getDataAsing();
      }else{
        this.getData();
      }
    }else{
      this._utils.showAlert('Error',this.modulo,response.text)
    }
  }

  changeSelectItem(value:any){}

  showReq(item:any){
    this.requisicion = item;
  }

  async buscar(){
    this.filtro.delete = false;
    console.log(this.filtro);
    var response = await this._api.get('requisicion',this.filtro);
    console.log(response);
    this.data = response.data;
  }
}
