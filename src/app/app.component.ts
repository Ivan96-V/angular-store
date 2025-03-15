import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListadoProductoComponent } from "./listado-producto/listado-producto.component";
import { ProductoComponent } from "./listado-producto/producto/producto.component";
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    ListadoProductoComponent,
    ProductoComponent,
    RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tienda Online';

  email: string = '';
  password: string = ''

  constructor(private loginService: LoginService){

  }
  
  isAutenticado() {
  return this.loginService.isAuthenticated()
  }
    

  salir() {
    this.loginService.logout();
  }
}
