import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css'
})
export class InitComponent implements OnInit {

  indicadores:any = {};

  constructor(private _api:ApiService) { }

  async ngOnInit() {
    var response:any = await this._api.get('requisicion/indicadores', {});
    this.indicadores = response.data;
    console.log(response)
  }
}
