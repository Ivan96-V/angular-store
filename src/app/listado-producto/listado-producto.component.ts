import { routes } from './../app.routes';
import { Component,  } from '@angular/core';
import { ProductoComponent } from './producto/producto.component';
import { FormsModule} from '@angular/forms'
import { Producto } from './producto/prodcuto.model';
import { FormularioProductoComponent } from "../formulario-producto/formulario-producto.component";
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-listado-producto',
  standalone: true,
  imports: [
    FormsModule, 
    ProductoComponent,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './listado-producto.component.html',
  styleUrl: './listado-producto.component.css'
})
export class ListadoProductoComponent {

  productos: {[llave:string]: Producto} = {};
  productosSubscription: Subscription | null = null;

  constructor(private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit() {
    // Inicializamos los productos
    this.cargarProductos();

    // escuchamos los cambios en la lista de productos
    this.productosSubscription = this.productoService.productoActualizados.subscribe((productos) => {
      this.productos = productos;
    })
  }

  cargarProductos(){
    this.productoService.listarProductos().subscribe((productos: {[llave:string]: Producto}) => {
      this.productos = productos;
      this.productoService.setProductos(productos);
    })
  }
  
  obtenerLlaves(): string[] {
    if(this.productos){
      return Object.keys(this.productos)
    } // si no se inizializa correctamente el arreglo de productos entonce que retorne un arreglo vacio
    return [];
  }

  // Con esta funcion va a redirigir al ususario al al componente agregar producto 
  agregarProducto () {
    this.router.navigate(['agregar'])
  }

  ngOnDestroy(): void {
    if(this.productosSubscription != null){
      this.productosSubscription.unsubscribe();
    }
  }  
}
 

  





