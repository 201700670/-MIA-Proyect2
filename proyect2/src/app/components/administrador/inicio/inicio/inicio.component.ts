import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Perfil } from 'src/app/components/models/perfil';
import { UploadService } from 'src/app/services/upload.service';
import { isNullOrUndefined } from 'util';
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  breakpoint: number;
  categoria:string=""
  hide = true;
  Usuario: Perfil = this.userService.getUser();;
  uploadedFiles: Array<File>;
  photoSelected: string | ArrayBuffer = this.Usuario.foto;
  file: File;
  nombre = "";
  menuItems: MenuItem[] = [
    {
      label: "Administrador",
      icon: 'perm_identity',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      ruta: 'PerfilCliente',
      foto: this.Usuario.foto
    }
  ];



  /////////////////////////////////////////////VARIABLES PARA INGRESO DE DATOS////////////////////////
  uploadedFiles: Array<File>;
  selectedviewValue: string;
  ////////////////////////////////////////////////CONSTRUCTOR ///////////////////////////////////////
  constructor(private serviceUpload: UploadService, private route: Router, private active: ActivatedRoute, private userService: UploadService) { }
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  
  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 450) ? 1 : 3;
    if (localStorage.getItem("usuarioLogeado") !== "undefined") {

      let usuario = localStorage.getItem('usuarioLogeado');
      if (!isNullOrUndefined(usuario)) {
        let user_JSON = JSON.parse(usuario);

        //console.log(user_JSON);
      }
      else { console.log("ERROR FATAL") }
    }
  }
  onResize(event) {
    this.breakpoint = (window.innerWidth <= 450) ? 1 : 3;
  }
  onPhotoSelected(event: HtmlInputEvent, e: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      this.uploadedFiles = e.target.files;

      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;

      reader.readAsDataURL(this.file);
    }
  }
  
  cerrarSesion(){
    localStorage.removeItem("usuarioLogeado");
    this.route.navigate(['']);
    window.localStorage.removeItem('usuarioLogeado');
    let userString = JSON.stringify(this.Usuario);
    window.localStorage.removeItem(userString);
    window.localStorage.clear();
    
  }
  addCategoria(){
    if(this.categoria!=""){
      this.userService.AddCategoria(this.categoria).subscribe((res)=>{
        alert(res);
        this.categoria="";
      })
    }else{
      alert("Ingrese una categoria");
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
  foto: string;
}