import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './listado-producto/producto/prodcuto.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  url = 'https://tienda-online-27783-default-rtdb.firebaseio.com/';

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) { }

  listadoProductos(): Observable<{ [ llave:string ]: Producto }> { // el URL que tenemos es un Observable, es por eso que se
    const token  = this.loginService.getIdToken();
    const url_listar = `${this.url}datos.json?auth=${token}`
    // le agrega en la funcion 
    return this.httpClient.get<{ [ llave:string ]: Producto }>(url_listar);
  }

  agregarProducto(producto: Producto): Observable<any>{
    const token  = this.loginService.getIdToken();
    const url_agregar = `${this.url}datos.json?auth=${token}`
    // en esta funcion se genera el valor de la llave de manera automatica para guardar el producto
    return this.httpClient.post(url_agregar, producto)
  }

  modificarProducto(producto: Producto, llave: string): Observable<any>{
    const token  = this.loginService.getIdToken();
    const url_modificar = `${this.url}datos/${llave}.json?auth=${token}`;
    return this.httpClient.put(url_modificar, producto);
  }

  eliminarProductobyDatos(llave:string): Observable<any>{
    const token  = this.loginService.getIdToken();
    const url_eliminar = `${this.url}datos/${llave}.json?auth=${token}`;
    return this.httpClient.delete(url_eliminar)
  }
}