import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListadoProductoComponent } from "./listado-producto/listado-producto.component";
import { ProductoComponent } from "./listado-producto/producto/producto.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    ListadoProductoComponent,
    ProductoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tienda Online';
}
