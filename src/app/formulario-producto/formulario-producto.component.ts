import { Component, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Producto } from '../listado-producto/producto/prodcuto.model';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-formulario-producto',
  imports: [
    FormsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.css'
})
export class FormularioProductoComponent {

  llaveProducto: string | null = null; 
  descripcionInput: string = '';
  precioInput: number | null = null;

  // implemento el constructor para llamar al servicio
  constructor ( 
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // verificar si sebemos cargar un producto existente
    const llave = this.route.snapshot.paramMap.get('llave');
    if(llave) {
      const producto = this.productoService.getProductoLlave(llave);
      if(producto) {
        // Si encontramos el producto lo cargamos en el formulario
        this.llaveProducto = llave;
        this.descripcionInput = producto.descripcion;
        this.precioInput = producto.precio;
      }
    }
  }

  guardarProducto(evento: Event) {
    evento.preventDefault();
    

    if (this.descripcionInput.trim() === '' || this.precioInput == null || 
      this.precioInput <=0) {
      alert('La descripcion tiene que estar completa ademas que el precio deber ser mayor a 0');
      return;
    }
    
    const producto = new Producto(this.descripcionInput, this.precioInput);
    // Agrego el nuevo producto usando el servicio de producto.service.ts
    this.productoService.guardarProducto(producto, this.llaveProducto)

    // Funcion para limpiar formulario 
    this.limpiarFormulario()

    // Redirigir al inicio de la app
    this.router.navigate(['/'])
  }

  cancelar(){
    // Redirigir al inicio de la app
    this.router.navigate(['/'])
  }

  eliminarProducto(){
    if(this.llaveProducto !== null) {
      this.productoService.eliminarProducto(this.llaveProducto);
      this.limpiarFormulario();
      this.router.navigate(['listado'])
    this.router.navigate([''])
    }
  }

  limpiarFormulario(){
  // esto es para que quede en blanco los inputs, despues de darle al evento (click) 
  this.llaveProducto = null
  this.descripcionInput = '';
  this.precioInput = null;}
}


