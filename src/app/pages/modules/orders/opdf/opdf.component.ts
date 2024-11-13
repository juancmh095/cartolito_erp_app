import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-opdf',
  standalone: true,
  imports: [
    DatePipe,
    NgFor,
    CurrencyPipe,
    NgIf
  ],
  templateUrl: './opdf.component.html',
  styleUrl: './opdf.component.css'
})
export class OpdfComponent implements OnInit{

  @Input() item: any = {};

  constructor(){}

  ngOnInit(): void {
    console.log(this.item);
  }
}
