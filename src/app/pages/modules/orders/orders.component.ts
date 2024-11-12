import { Component, OnInit } from '@angular/core';
import { OpdfComponent } from './opdf/opdf.component';
import { UtilsService } from '../../../../services/utils.service';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { CommonModule, NgFor } from '@angular/common';
import { CustomDropdownComponent } from '../../../utils/custom-dropdown/custom-dropdown.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    OpdfComponent,
    FormsModule,
    NgFor,
    CommonModule,
    CustomDropdownComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  formData: any = {};
  catalogos: any = {};
  productos:any = [];
  productosOrder:any = [];
  maquinas:any = [];
  proveedores:any = [];
  useReq:any = false;
  product:any = {};
  user:any = {};
  userID:any;
  requisicionSelect:any = {};
  infoAdv:any = false;
  listAdv:any = [];
  selectProduct:any;
  today:any;
  data:any = [];
  modulo:any = 'Ordenes de Compra'
  api:any = environment.api;

  constructor(
    private _utils:UtilsService,
    private _api:ApiService
  ){}


  ngOnInit(){
    this.getCatalogue()
    this.getDataList();
    this.user = this._utils.user();
    this.userID = this._utils.userID();
    this.today = this._utils.today();
    this.getDataOC();
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

  async onSubmit(form: any) {
    if (form.valid) {
      console.log(this.formData)
      this.formData.productos = this.productosOrder;
      this.formData.user_create = this.userID;
      var response:any = await this._api.post('oc',this.formData);
      console.log(response);
      if(response.status){
        this._utils.showAlert('success',this.modulo,response.text)
        this._utils.closeModal();
        this.formData = {};
        this.productosOrder = [];
      }else{
        this._utils.showAlert('Error',this.modulo,response.text)
      }
      console.log('Formulario enviado:', this.formData);
    } else {
      console.log('Formulario no válido');
    }
  }

  async getDataOC(){
    var data = await this._api.get('oc',{});
    console.log(data);
    this.data = data.data;
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
          if(this.requisicionSelect.status == 2){
            this._utils.showAlert('error','Orden De Compra','La Requisición Ya fue comprada')
          }else{
            this.productosOrder = this.requisicionSelect.products;
            let ccs = new Set();
            let prov = new Set();
            this.formData.Requisition = this.requisicionSelect._id;

            ccs.add(this.requisicionSelect.CC.value);
            for (let i = 0; i < this.productosOrder.length; i++) {
              const element = this.productosOrder[i];
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
          this.calculateTotal();

          }

      }
    }else{
      this._utils.showAlert('error','Orden De Compra','Folio de Requisición No valido')
    }
  }

  addProduct(){
    console.log(this.product);
    if(this.product.name && this.product.um && this.product.quantity){
      this.productosOrder.push(this.product);
      this.product = {};
      this.selectProduct = false;
    }else{
      this._utils.showAlert('error','Requisiciones','Debe completar todos los campos')
    }
    this.calculateTotal();
  }

  loadRFC(){
    var prov:any = this.proveedores.filter((item:any) => item._id == this.formData.providerid);
    console.log(prov);
    if(prov.length > 0){
      this.formData.RFC =  prov[0]['RFC'];
    }
  }

  onOptionSelected(option: any) {
    this.product.name = option.name;
    this.product._id = option._id;
    this.product.code = option.code;
    this.product.um = option.unitSize;
    this.product.price = option.price;
    this.product.providerId = option.providerId;
    console.log('Opción seleccionada:', option); // Aquí puedes manejar la opción seleccionada como desees
  }

  calculateTotal(){
    this.formData.Total = 0;
    this.formData.Subtotal = 0;
    this.productosOrder.forEach((element:any) => {
      this.formData.Subtotal = this.formData.Subtotal + (element.quantity * element.price);
    });
    var ivx = (this.formData.Subtotal * this.formData.iva) /100;
    this.formData.ivaTotal = ivx;
    var ivr = (this.formData.Subtotal * this.formData.ivaR) /100;
    this.formData.ivaRetTotal = ivr;
    var isrT = (this.formData.Subtotal * this.formData.isr) /100;
    this.formData.isrTotal = isrT;
    var dest = (this.formData.Subtotal * this.formData.descuento) /100;
    this.formData.descuentoTotal = dest;
    this.formData.Total = this.formData.Subtotal + ivx - ivr - dest + this.formData.flete + isrT;
    console.log(ivx,ivr,this.formData);
  }
}
