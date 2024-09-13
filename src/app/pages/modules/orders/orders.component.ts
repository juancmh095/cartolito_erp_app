import { Component } from '@angular/core';
import { OpdfComponent } from './opdf/opdf.component';
import { UtilsService } from '../../../../services/utils.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    OpdfComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  constructor(private _utils:UtilsService){}

  print(){
    this._utils.print('printAreaOPDF');
  }
}
