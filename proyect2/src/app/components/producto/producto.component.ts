import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { Perfil } from '../models/perfil';
import { Producto } from '../models/producto';
import { AgregarComponent } from './crud-producto/agregar/agregar.component';
import { DescripcionComponent } from './crud-producto/descripbreve/descripcion/descripcion.component';
import { ModificarproductoComponent } from './crud-producto/modificar/modificarproducto/modificarproducto.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  Usuario: Perfil = this.userService.getUser();
  breakpoint: number;
  allProduct: Producto[]=[];
  i;
  des;
  menuItems: MenuItem[] = [
    {
      label: this.Usuario.nombre + " " + this.Usuario.apellido,
      icon: 'perm_identity',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      ruta: 'PerfilCliente',
      foto: this.Usuario.foto
    }
  ];
  constructor(public dialog: MatDialog,private serviceUpload: UploadService, private route: Router, private http: HttpClient, private active: ActivatedRoute, private userService: UploadService) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 450) ? 1 : 3;
    this.userService.mostrarProducto(this.Usuario.id).subscribe((res:Producto[]) => {
      this.allProduct=res;
      
    });
    
  }
  onResize(event) {
    this.breakpoint = (window.innerWidth <= 450) ? 1 : 3;
  }

  agregarProducto() {
    this.dialog.open(AgregarComponent);
  }
  descripcionProducto(item) {
    this.dialog.open(DescripcionComponent, {
      data: this.allProduct[item]
      
    });
  }
  modificarProducto(item) {
    this.dialog.open(ModificarproductoComponent, {
      data: this.allProduct[item]
    });
  }
  eliminarProducto(item){
    this.userService.eliminarProducto(this.allProduct[item].id).subscribe((res) => {
      alert(res['msg'])
      location.reload();
    });
    
  }
  cerrarSesion(){
    localStorage.removeItem("usuarioLogeado");
    this.route.navigate(['']);
    window.localStorage.removeItem('usuarioLogeado');
    let userString = JSON.stringify(this.Usuario);
    window.localStorage.removeItem(userString);
    window.localStorage.clear();
    
  }
}
export interface MenuItem {
  label: string;
  icon: string;
  showOnMobile: boolean;
  showOnTablet: boolean;
  showOnDesktop: boolean;
  ruta: string;
  foto: string;
}
