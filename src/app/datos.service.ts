import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './listado-producto/producto/prodcuto.model';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  url = 'https://tienda-online-27783-default-rtdb.firebaseio.com/';

  constructor(private httpClient: HttpClient) { }

  listadoProductos(): Observable<{ [ llave:string ]: Producto }> { // el URL que tenemos es un Observable, es por eso que se
    // le agrega en la funcion 
    return this.httpClient.get<{ [ llave:string ]: Producto }>(this.url + 'datos.json');
  }

  agregarProducto(producto: Producto): Observable<any>{
    // en esta funcion se genera el valor de la llave de manera automatica para guardar el producto
    return this.httpClient.post(`${this.url}datos.json`, producto)
  }

  modificarProducto(producto: Producto, llave: string): Observable<any>{
    const url_modificar = `${this.url}datos/${llave}.json`;
    return this.httpClient.put(url_modificar, producto);
  }

  eliminarProductobyDatos(llave:string): Observable<any>{
    const url_eliminar = `${this.url}datos/${llave}.json`;
    return this.httpClient.delete(url_eliminar)
  }
}