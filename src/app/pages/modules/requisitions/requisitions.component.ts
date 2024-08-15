import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-requisitions',
  standalone: true,
  imports: [],
  templateUrl: './requisitions.component.html',
  styleUrl: './requisitions.component.css'
})
export class RequisitionsComponent implements OnInit{

  ngOnInit(){
    console.log($)
    $('#producto').selectize({
      create:true,
      onChange: function( value:any ) {
        console.log(value)
      }
    });
    
    $('.selectize-input').addClass('form-select');
  }

  changeSelectItem(value:any){

  }
}
