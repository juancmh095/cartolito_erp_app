import { Component } from '@angular/core';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    TopBarComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
