import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CarroService } from 'src/app/services/carro.service';
import { UploadService } from 'src/app/services/upload.service';
import { Perfil } from '../../models/perfil';
import { Producto } from '../../models/producto';
import { DescripcionComponent } from '../../producto/crud-producto/descripbreve/descripcion/descripcion.component';
import * as $ from 'jquery';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
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
  constructor(public dialog: MatDialog,private carroService: CarroService, private route: Router,  private active: ActivatedRoute, private userService: UploadService) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 450) ? 1 : 3;
    this.carroService.mostrarCarrito(this.Usuario.id).subscribe((res:Producto[]) => {
      this.allProduct=res;
    });
    
  }
  onResize(event) {
    this.breakpoint = (window.innerWidth <= 450) ? 1 : 3;
  }

  agregarProducto() {
    
  }
  descripcionProducto(item) {
    this.dialog.open(DescripcionComponent, {
      data: this.allProduct[item]
    });
  }
  modificarProducto(item) {
    
  }
  eliminarProducto(item){
    var valor = $('cantidad'+item);
    var texto= valor.find('input[id=cantidad'+item).val()
    alert(this.allProduct[item].cantidad)
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
