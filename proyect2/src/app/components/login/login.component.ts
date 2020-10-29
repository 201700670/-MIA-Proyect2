import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';
import { ForgotemailComponent } from '../forgotemail/forgotemail.component'
import { Perfil } from '../models/perfil';
import { UserInterface } from '../models/user.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  correo: string = "";
  contra: string = "";

  constructor(public dialog: MatDialog, private Userservices: UploadService, private route: Router) { }
  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'home',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true,
      ruta: '#'
    },
    {
      label: 'Registro',
      icon: 'perm_identity',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      ruta: 'registro'
    }
  ];
  openDialog() {
    this.dialog.open(ForgotemailComponent);
  }
  ngOnInit(): void {
  }
  LocalStorage() {
    let data: Perfil = { id: 12 };
    this.Userservices.setUser(data);
  }
  login() {
    this.Userservices.Loginin(this.correo, this.contra).subscribe((res) => {
      //console.log(res);
      if (res['msg']) {
        let DataUser: Perfil = res['DataUser'];
        if (DataUser.estado == 0) { alert("No ha confirmado Correo"); return; }
        else if (DataUser.estado == 3) { alert("Usuario suspendido"); return; }
        else if (DataUser.estado != 1) { alert("Usuario dado de baja"); return; }


        this.Userservices.setUser(DataUser);
        if (DataUser.tipousuario == 3) { this.route.navigate(['Producto']); }
        else if (DataUser.tipousuario == 2) {
          alert("Pagina del servicio de ayuda en mantenimiento :(");
          localStorage.removeItem("usuarioLogeado");
          this.route.navigate(['login']);

        }
        else if (DataUser.tipousuario == 1) { this.route.navigate(["admin"]) };

      } else {

        alert("Credenciales Incorectas");
      }
    })


  }
}


export interface MenuItem {
  label: string;
  icon: string;
  showOnMobile: boolean;
  showOnTablet: boolean;
  showOnDesktop: boolean;
  ruta: string;
}