import { Routes } from '@angular/router';
import { ListadoProductoComponent } from './listado-producto/listado-producto.component';
import { FormularioProductoComponent } from './formulario-producto/formulario-producto.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LoginGuardianService } from './login-guardian.service';

export const routes: Routes = [

    {path: '', component: ListadoProductoComponent, canActivate:[ LoginGuardianService]},
    {path: 'listado', component: ListadoProductoComponent, canActivate:[ LoginGuardianService]},
    {path: 'agregar', component: FormularioProductoComponent, canActivate:[ LoginGuardianService]},
    // en la parte de 'llave' es para que habra cada producto que deseamos editar, esta llave viene de la base de datos en formato JSON
    {path:'editar/:llave', component: FormularioProductoComponent,  canActivate:[ LoginGuardianService]},
    {path:'login', component: LoginComponent}, // No se usa el guardian ya que entrariamos a un loop infinito
    // Esto es una ruta comodin para cualquier ruta no registrada
    {path: '**', component: ErrorComponent}
];
