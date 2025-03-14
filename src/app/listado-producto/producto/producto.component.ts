import { ProductoService } from '../../producto.service';
import { Producto } from './prodcuto.model';
import { Component, input, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  @Input() productos!: Producto;
  @Input() llave!: string;

  constructor (private router: Router) {}

  editarProducto(){
    // pasar ID en la URL
    this.router.navigate(['/editar', this.llave])

  }
  
}
