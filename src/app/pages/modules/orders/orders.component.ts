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
  user:any = {};
  userID:any;
  requisicionSelect:any = {};
  infoAdv:any = false;
  listAdv:any = [];

  constructor(
    private _utils:UtilsService,
    private _api:ApiService
  ){}


  ngOnInit(){
    this.getCatalogue()
    this.getDataList();
    this.user = this._utils.user();
    this.userID = this._utils.userID();
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

  async validateReq(){
    var req = await this._api.get('requisicion',{folio:this.formData.folioReq})
    this.requisicionSelect = req.data[0];
    console.log(req,this.requisicionSelect,this.formData);

    if(this.requisicionSelect && this.formData.folioReq){
      if(this.requisicionSelect.status == 0){
        this._utils.showAlert('error','Orden De Compra','La Requisición no ha sido aprobada')
      }else{
        if(this.requisicionSelect.status == 3){
          this._utils.showAlert('error','Orden De Compra','La Requisición Rechazada')
        }else{
          this.productos = this.requisicionSelect.products;
          let ccs = new Set();
          let prov = new Set();

          ccs.add(this.requisicionSelect.CC.value);
          for (let i = 0; i < this.productos.length; i++) {
            const element = this.productos[i];
            if(element.machine){
              ccs.add(element.machine.cc)
              prov.add(element.providerId)
            }
          }

          if(ccs.size > 1){
            this.listAdv.push('Mas de un CC Asignado');
            this.infoAdv = true;
          }

          if(prov.size > 1){
            this.listAdv.push('Mas de un Proveedor Asignado');
            this.infoAdv = true;
          }
          console.log(ccs,ccs.size);
        }

      }
    }else{
      this._utils.showAlert('error','Orden De Compra','Folio de Requisición No valido')
    }
  }

  addProduct(){

  }
}
