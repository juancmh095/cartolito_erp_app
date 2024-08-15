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
    $(".selectMA").select2({
      tags: true
    });
  }
}
