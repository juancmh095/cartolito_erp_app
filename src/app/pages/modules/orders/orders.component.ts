import { Component, OnInit } from '@angular/core';
import { OpdfComponent } from './opdf/opdf.component';
import { UtilsService } from '../../../../services/utils.service';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    OpdfComponent,
    FormsModule,
    NgFor,
    CommonModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  formData: any = {};
  catalogos: any = {};
  productos:any = [];
  maquinas:any = [];
  proveedores:any = [];
  useReq:any = false;
  product:any = {};


  constructor(
    private _utils:UtilsService,
    private _api:ApiService
  ){}


  ngOnInit(){
    this.getCatalogue()
    this.getDataList();
  }

  async getDataList(){
    var responseProv = await this._api.get('catalogos/proveedores',{});
    this.proveedores = responseProv.data;
    var responseMaq = await this._api.get('catalogos/maquinas',{});
    this.maquinas = responseMaq.data;
    var responseProd = await this._api.get('catalogos/productos',{});
    this.productos = responseProd.data;
    console.log(this.productos,this.maquinas,this.proveedores)
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

  onSubmit(form: any) {
    console.log(this.formData)
    if (form.valid) {
      console.log('Formulario enviado:', this.formData);
    } else {
      console.log('Formulario no válido');
    }
  }
  print(){
    this._utils.print('printAreaOPDF');
  }

  addProduct(){

  }
}
