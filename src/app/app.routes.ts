import { Routes } from '@angular/router';
import { ListadoProductoComponent } from './listado-producto/listado-producto.component';
import { FormularioProductoComponent } from './formulario-producto/formulario-producto.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [

    {path: '', component: ListadoProductoComponent},
    {path: 'listado', component: ListadoProductoComponent},
    {path: 'agregar', component: FormularioProductoComponent},
    {path:'editar/:llave', component: FormularioProductoComponent},
    // Esto es una ruta comodin para cualquier ruta no registrada
    {path: '**', component: ErrorComponent}
];
