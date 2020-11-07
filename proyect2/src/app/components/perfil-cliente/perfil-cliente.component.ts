import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { updateImportEqualsDeclaration } from 'typescript';
import { Perfil } from '../models/perfil';
import { Md5 } from "md5-typescript";
import { CarroService } from 'src/app/services/carro.service';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../models/user.interface';
import { isNullOrUndefined } from 'util';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {
  breakpoint: number;
  hide = true;
  Usuario: Perfil = this.userService.getUser();;
  uploadedFiles: Array<File>;
  photoSelected: string | ArrayBuffer = this.Usuario.foto;
  file: File;
  nombre = "";
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



  firstname = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  getErrorMessageother() {
    if (this.lastname.hasError('required')) {
      return 'Debes ingresar un valor';
    } else if (this.firstname.hasError('required')) {
      return 'Debes ingresar un valor';
    } else {
      return 'Campos obligatorios Debes ingresar un valor';
    }
  }
  /////////////////////////////////////////////VARIABLES PARA INGRESO DE DATOS////////////////////////
  uploadedFiles: Array<File>;
  nombre: string = this.Usuario.nombre;
  apellido: string = this.Usuario.apellido;
  pais: string = this.Usuario.pais;
  fecha: Date = new Date(this.Usuario.fecha_nacimiento);
  correo: string = this.Usuario.correo_electronico;
  password: string = "";
  urlfoto: string = this.menuItems[0].foto;
  model: string = ""
  exampleHeader: string = ""
  selectedviewValue: string;
  hide = true;
  hide1 = true;
  contra: string = "";
  isChecked = false;
  isChecked2 = false;
  creditos: number = this.Usuario.creditos;
  codu: number = this.Usuario.id;
  file: File;
  idUser: Perfil;
  User: Perfil
  ////////////////////////////////////////////////CONSTRUCTOR ///////////////////////////////////////
  constructor(private serviceUpload: UploadService, private route: Router, private http: HttpClient, private active: ActivatedRoute, private userService: UploadService) { }
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  SelectedPais() {
    var cod = document.getElementById("pais");
    alert(cod);

  }
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
  crear_user(User: Perfil) {
    return User;
  }
  guardarCambios() {
    if (this.isChecked2) {
      //////ESTE ES PARA HACERLO CAMBIANDO CONTRASE;AS*/////////////////////////////////////
      /********************Este es para descargar las imagenes *******************/
      if (this.contra != this.password && this.password != "" && this.contra != "") {
        alert("LAS CONTRASEÑAS DEBEN SER IGUALES ")
        return;
      }
      if (this.contra != "" && this.nombre != "" && this.apellido != "" && this.fecha != null && this.correo != "" && this.urlfoto != "" && this.pais != "") {

        if (this.isChecked && this.uploadedFiles != null) {
          let formData = new FormData();
          for (let i = 0; i < this.uploadedFiles.length; i++) {
            formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
          }
          this.serviceUpload.uploadFile(formData).subscribe((res) => {
            console.log('response received is ', JSON.stringify(res));
            let temporal = JSON.stringify(res).split("\"", 4);
            let temporal2 = temporal[3].split("/")
            this.urlfoto = ""
            this.urlfoto = temporal2[4] + "/" + temporal2[5];
            this.menuItems[0].foto = this.urlfoto
            this.Usuario.foto = this.urlfoto
            //../../proyect2/src/assets/TypNDKHMkv1k8kruQK0Bcz1R.png
            alert("CON IMAGEN " + this.urlfoto)
            let date = this.fecha.getFullYear() + "/" + (this.fecha.getMonth() + 1) + '/' + this.fecha.getDate();
            this.serviceUpload.Modify(this.nombre, this.apellido, this.pais, this.correo, date, this.contra, temporal2[4] + "/" + temporal2[5])
              .subscribe((res: Perfil) => {
                this.User = res;
                this.uploadedFiles = null;
                this.nombre = this.User.nombre;
                this.apellido = this.User.apellido;
                this.pais = this.User.pais;
                this.password = "";
                this.urlfoto = this.Usuario.foto;
                this.model = ""
                this.exampleHeader = ""
                this.selectedviewValue = "";
                this.hide = true;
                this.hide1 = true;
                this.contra = "";
                this.Usuario.nombre = this.nombre
                this.Usuario.apellido = this.apellido
                this.Usuario.fecha_nacimiento = date
                this.Usuario.pais = this.pais
                this.Usuario.foto = this.urlfoto


              })
            this.userService.setUser(this.Usuario);
            alert("Cambios Guardados, Se ha registrado exitosamente!");
            this.route.navigate(["PerfilCliente"]);
            ////crear carro
          });
        } else {
          ////ESTE ME SIRVE SIN DESCARGAR LAS IMAGENES
          alert("SIN IMAGEN " + this.urlfoto)
          let date = this.fecha.getFullYear() + "/" + (this.fecha.getMonth() + 1) + '/' + this.fecha.getDate();
          this.serviceUpload.Modify(this.nombre, this.apellido, this.pais, this.correo, date, this.contra, this.Usuario.foto)
            .subscribe((res: Perfil) => {
              this.User = res;
              this.uploadedFiles = null;
              this.nombre = this.User.nombre;
              this.apellido = this.User.apellido;
              this.pais = this.User.pais;
              this.password = "";
              this.urlfoto = this.Usuario.foto;
              this.model = ""
              this.exampleHeader = ""
              this.selectedviewValue = "";
              this.hide = true;
              this.hide1 = true;
              this.contra = "";
              this.Usuario.nombre = this.nombre
              this.Usuario.apellido = this.apellido
              this.Usuario.fecha_nacimiento = date
              this.Usuario.pais = this.pais
              this.Usuario.foto = this.urlfoto

            })
          this.userService.setUser(this.Usuario);
          alert("Cambios Guardados, Se ha registrado exitosamente!");
          this.route.navigate(["PerfilCliente"]);
          ////crear carro
        }


      } else {
        alert("Uno de los campos no se ha llenado")
      }
    } else {


      //////ESTE ES PARA HACERLO SIN CAMBIAR CONTRASE;AS*/////////////////////////////////////
      /********************Este es para descargar las imagenes *******************/
      if (this.nombre != "" && this.apellido != "" && this.fecha != null && this.correo != "" && this.urlfoto != "" && this.pais != "") {

        if (this.isChecked && this.uploadedFiles != null) {
          let formData = new FormData();
          for (let i = 0; i < this.uploadedFiles.length; i++) {
            formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
          }
          this.serviceUpload.uploadFile(formData).subscribe((res) => {
            console.log('response received is ', JSON.stringify(res));
            let temporal = JSON.stringify(res).split("\"", 4);
            let temporal2 = temporal[3].split("/")
            this.urlfoto = ""
            this.urlfoto = temporal2[4] + "/" + temporal2[5];
            this.menuItems[0].foto = this.urlfoto
            this.Usuario.foto = this.urlfoto
            //../../proyect2/src/assets/TypNDKHMkv1k8kruQK0Bcz1R.png
            let date = this.fecha.getFullYear() + "/" + (this.fecha.getMonth() + 1) + '/' + this.fecha.getDate();
            this.serviceUpload.Modify(this.nombre, this.apellido, this.pais, this.correo, date, "0000", temporal2[4] + "/" + temporal2[5])
              .subscribe((res: Perfil) => {
                this.User = res;
                this.uploadedFiles = null;
                this.nombre = this.User.nombre;
                this.apellido = this.User.apellido;
                this.pais = this.User.pais;
                this.password = "";
                this.urlfoto = this.Usuario.foto;
                this.model = ""
                this.exampleHeader = ""
                this.selectedviewValue = "";
                this.hide = true;
                this.hide1 = true;
                this.contra = "";
                this.Usuario.nombre = this.nombre
                this.Usuario.apellido = this.apellido
                this.Usuario.fecha_nacimiento = date
                this.Usuario.pais = this.pais
                this.Usuario.foto = this.urlfoto


              })
            this.userService.setUser(this.Usuario);
            alert("Cambios Guardados, Se ha registrado exitosamente!");
            this.route.navigate(["PerfilCliente"]);
            ////crear carro
          });
        } else {
          ////ESTE ME SIRVE SIN DESCARGAR LAS IMAGENES
          let date = this.fecha.getFullYear() + "/" + (this.fecha.getMonth() + 1) + '/' + this.fecha.getDate();
          this.serviceUpload.Modify(this.nombre, this.apellido, this.pais, this.correo, date, "0000", this.Usuario.foto)
            .subscribe((res: Perfil) => {
              this.User = res;
              this.uploadedFiles = null;
              this.nombre = this.User.nombre;
              this.apellido = this.User.apellido;
              this.pais = this.User.pais;
              this.password = "";
              this.urlfoto = this.Usuario.foto;
              this.model = ""
              this.exampleHeader = ""
              this.selectedviewValue = "";
              this.hide = true;
              this.hide1 = true;
              this.contra = "";
              this.Usuario.nombre = this.nombre
              this.Usuario.apellido = this.apellido
              this.Usuario.fecha_nacimiento = date
              this.Usuario.pais = this.pais
              this.Usuario.foto = this.urlfoto
              this.userService.setUser(this.Usuario);
              alert("Cambios Guardados, Se ha registrado exitosamente!");
              this.route.navigate(["PerfilCliente"]);
            })
          ////crear carro
        }


      } else {
        alert("Uno de los campos no se ha llenado")
      }
    }

  }
  eliminar() {
    if (confirm("Desea dar de baja su cuenta?")) {
      this.userService.darBaja(this.Usuario.id).subscribe((res) => { });
      localStorage.removeItem("usuarioLogeado");
      this.route.navigate(['']);

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