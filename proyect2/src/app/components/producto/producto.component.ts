import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { Perfil } from '../models/perfil';
import { AgregarComponent } from './crud-producto/agregar/agregar.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  Usuario: Perfil = this.userService.getUser();
  breakpoint: number;;
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
  }
  onResize(event) {
    this.breakpoint = (window.innerWidth <= 450) ? 1 : 3;
  }

  agregarProducto() {
    this.dialog.open(AgregarComponent);
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
