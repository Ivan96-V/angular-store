import { Injectable } from '@angular/core';
import { Producto } from './listado-producto/producto/prodcuto.model';
import { DatosService } from './datos.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
    
  productos: {[llave:string]: Producto} = {};
  // Observable para notificar cambios
  productoActualizados = new Subject<{[llave:string]: Producto}>();

  constructor(private datosService: DatosService) {}
    
  listarProductos(){
    return this.datosService.listadoProductos();
  }

  // Esta funcion sirve para cuando se selecione el producto en editar, salga la desscripcion y su valor
  // correspondiente
  getProductoLlave(llave: string): Producto | undefined {
    return this.productos[llave];
    // return this.productos.find(producto => producto.id === id);
  }

  // Esta funcion va a manejar un producto o modificar un producto ya existente
  guardarProducto(producto: Producto, llave: string | null = null) {
    if(llave === null){
      // case de agregar producto
      this.datosService.agregarProducto(producto).subscribe(() => {
        this.refrescarProductos()
        });
    } else {
      this.datosService.modificarProducto(producto, llave).subscribe(() => { // se subscribe porque es un observable
        this.refrescarProductos()
      });
    }
  }

  private refrescarProductos(){
    this.listarProductos().subscribe((productos: {[llave:string]: Producto}) => {
      this.setProductos(productos);
    })
  }

  // Inicializar el diccionario de productos con el valor de productos
  setProductos(productos: {[llave:string]: Producto}){
    this.productos = productos;
    this.productoActualizados.next(productos) // emitir la actualizacion de la lista
  }

  eliminarProducto(llave: string){
    this.datosService.eliminarProductobyDatos(llave).subscribe(() => { // se subscribe porque es un observable desde componente datos.service
      this.refrescarProductos()
    });
  }
}

