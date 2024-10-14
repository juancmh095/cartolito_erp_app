import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-dropdown',
  standalone:true,
  imports:[NgFor, CommonModule, FormsModule],
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css']
})
export class CustomDropdownComponent implements OnInit, OnChanges {
  @Input() options: any = []; // Recibe la lista de opciones desde el padre
  @Input() selected: Boolean = false; // Recibe la lista de opciones desde el padre
  @Output() optionSelected = new EventEmitter<any>(); // Emite la opción seleccionada al padre

  isDropdownOpen = false;
  selectedItem: any = {};
  dataReal:any = [];
  item:any;

  constructor(){

  }

  ngOnInit(): void {
    console.log('opciones',this.options)
    this.dataReal = this.options;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selected']) {
      console.log('Las opciones han cambiado:', changes['selected'].currentValue);
      this.selected = false;
    }
  }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: string) {
    this.selectedItem = option;
    this.selectedItem.name = this.selectedItem.name?this.selectedItem.name:this.selectedItem.title
    this.isDropdownOpen = false;
    this.selected = true;
    this.optionSelected.emit(option); // Emitimos la opción seleccionada al componente padre
  }


  pressTxt(){
    console.log(this.item)
    if(this.item == ''){
      this.options = this.dataReal;
    }else{
      this.options = this.dataReal.filter((res:any) =>  res.name?((res.name).toUpperCase()).includes((this.item).toUpperCase()):((res.title).toUpperCase()).includes((this.item).toUpperCase()))
    }
  }

  enterFunc($event:any){
    console.log(this.item);
    this.selectedItem = {name:this.item, _id:0};
    this.dataReal.push({name:this.item, _id:0});
    this.options.push({name:this.item, _id:0});
    this.item = '';
    this.isDropdownOpen = false;
    this.options = this.dataReal;
    $event.preventDefault(); // Evita que se envíe el formulario al presionar Enter
    this.optionSelected.emit({name:this.item, _id:0});
  }
}
