import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadMetadata } from 'angular2-image-upload';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.component.html',
  styleUrls: ['./recuperar-contra.component.css']
})
export class RecuperarContraComponent implements OnInit {

  private id_user: any;
  hide = true;
  correo: string = "";
  contra: string = "";
  contra1: string = "";
  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'home',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true,
      ruta: '#'
    }
  ];
  constructor(private active: ActivatedRoute, private userService: UploadService, private route: Router) { }

  ngOnInit(): void {
    const parm = this.active.snapshot.params;
    this.id_user = parm.id;
  }
  get() {
    if (this.contra == "" || this.contra1 == "") {
      alert("Llene todos los campos");
      return;
    }
    if (this.contra1 == this.contra) {
      this.userService.cambiarContra(this.id_user, this.contra).subscribe((res) => { });
      alert("contraseña cambiada con exito!")
      this.route.navigate(["login"]);
    }
    else {
      alert("la contraseña no es igual")
      return;
    }
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