import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { ChangePasswordComponent } from './pages/auth/change-password/change-password.component';
import { AuthGuard } from '../auth/auth-guard.guard';
import { logoutGuard } from '../auth/logout.guard';
import { RequisitionsComponent } from './pages/modules/requisitions/requisitions.component';

export const routes: Routes = [

    {  path: 'erp', canActivate:[AuthGuard], component: HomeComponent,children:[
      //{  path: 'admin', component: ContainerComponent,children:[
        {  path: '', component: HomeComponent },
        {  path: 'requisiciones', component:  RequisitionsComponent},
      ]
    },
    {  path: 'login', canActivate:[logoutGuard],component: LoginComponent },
    {  path: '', canActivate:[logoutGuard],component: LoginComponent },
    {  path: 'reset', component: ResetPasswordComponent },
    {  path: 'change', component: ChangePasswordComponent }

];
