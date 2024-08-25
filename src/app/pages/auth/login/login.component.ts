import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from '../../../../services/utils.service';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  model:any = {};
  type:any = 'password';
  dominio:any = environment.dominio;

  constructor(
    private _utils:UtilsService,
    private _api:ApiService,
    private router: Router
  ){}

  ngOnInit(){
    var lc:any = localStorage.getItem('cartolitoLoginRemember');
    if(lc){
      var data = JSON.parse(lc)
      this.model = data;
    }
  }

  async login(form:any){
    console.log(form,this.model);
    if(!form.invalid){
      var email = this.model.email;
      email = email.split('@')
      if(email.length > 1){
        if(email[1] != this.dominio){
          return this._utils.showAlert('error','Login','Dominio del correo no corresponde a la institucion')
        }
      }else{
        this._utils.showAlert('error','Login','Error de email')
      }

      if(this.model.remember){
        localStorage.setItem('cartolitoLoginRemember',JSON.stringify(this.model))
      }else{
        localStorage.removeItem('cartolitoLoginRemember')
      }

      var response = await this._api.post('login',this.model);
      console.log(response);
      if(response.status){
        localStorage.setItem('cartolitoToken',response.token)
        localStorage.setItem('cartolitoUser',JSON.stringify(response.data))
        localStorage.setItem('cartolitoUserID',response.data._id)
        this.router.navigate(['/erp'])
      }else{
        this._utils.showAlert('error','Login',response.text)
      }
    }else{
      this._utils.showAlert('error','Login','Datos Incompletos')
    }
  }

  async sendRecPassword(){
    var response = await this._api.post('changepsw', this.model);
    if(response.status){
      this._utils.showAlert('success','Login',response.text)
    }else{
      this._utils.showAlert('error','Login',response.text)

    }
  }

}
