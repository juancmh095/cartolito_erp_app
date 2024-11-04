import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements OnInit {

  user:any = {}

  constructor(
    private router:Router,
    private _utils:UtilsService
  ){}

  ngOnInit() {
    this.user = this._utils.user();
  }


  logout(){
    localStorage.removeItem('cartolitoToken');
    localStorage.removeItem('cartolitoUser');
    localStorage.removeItem('cartolitoUserID');
    this.router.navigate(['/'])
  }

}
