import { Component, OnInit, ɵConsole, VERSION, ViewChild } from '@angular/core';
import { UploadService } from "../../services/upload.service";
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { UserInterface } from '../models/user.interface';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { from } from 'rxjs';
import { Perfil } from '../models/perfil';
import { CarroService } from 'src/app/services/carro.service';
import { CorreoService } from 'src/app/services/correo.service';
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  breakpoint: number;
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
      label: 'Login',
      icon: 'login',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      ruta: 'login'
    }
  ];
  ///////////////////////////////////////RESTRICCIONES PARA NO DEJAR CAMPOS VACIOS/////////////////
  email = new FormControl('', [Validators.required, Validators.email]);
  firstname = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
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
  nombre: string = "";
  apellido: string = "";
  pais: string = "";
  fecha: Date
  correo: string = "";
  password: string = "";
  urlfoto: string = "assets/no-image.png";
  model: string = ""
  exampleHeader: string = ""
  selectedviewValue: string;
  hide = true;
  hide1 = true;
  contra: string = "";
  isChecked = false;
  codu: string = "";
  photoSelected: string | ArrayBuffer;
  file: File;
  Usuario: UserInterface[] = []
  idUser:Perfil;
  SelectedPais() {
    var cod = document.getElementById("pais");
    alert(cod);

  }
  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 450) ? 1 : 3;
  }


  onResize(event) {
    this.breakpoint = (window.innerWidth <= 450) ? 1 : 3;
  }
  ////////////////////CONSTRUCTOR//////////////////////////////////
  constructor(private correoservice: CorreoService, private carroService: CarroService, private serviceUpload: UploadService, private route: Router, private http: HttpClient) { }
  //////////////////////////////////////FUNCION PARA ENVIAR DATOS A SERVIDOR///////////////////////////
  ViewUser() {
    if (this.contra != "" && this.password != "" && this.contra == this.password) {
      if (this.isChecked && this.uploadedFiles != null) {
        let formData = new FormData();
        for (let i = 0; i < this.uploadedFiles.length; i++) {
          formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
        }
        this.serviceUpload.uploadFile(formData).subscribe((res) => {
          console.log('response received is ', JSON.stringify(res));
          let temporal = JSON.stringify(res).split("\"", 4);
          let temporal2=temporal[3].split("/")
          this.urlfoto = temporal2[4]+"/"+temporal2[5];
          //../../proyect2/src/assets/TypNDKHMkv1k8kruQK0Bcz1R.png
        });
      }

      if (this.nombre != "" && this.apellido != "" && this.fecha != null && this.correo != "" && this.urlfoto != "" && this.pais != "" && this.contra != "") {
        this.serviceUpload.CorreoId(this.correo).subscribe((res) => {
          var idUsuario: Perfil = res;
          if (idUsuario.id != 0) {
            alert("El correo ya existe");
            return;
          }

          
          let date = this.fecha.getFullYear() + "/" + (this.fecha.getMonth() + 1) + '/' + this.fecha.getDate();
          this.serviceUpload.InsertUser(this.nombre, this.apellido, this.pais, this.correo, date, this.contra, this.urlfoto, 2)
            .subscribe((res: UserInterface[]) => {
              this.Usuario = res;
              this.codu = "";
              this.uploadedFiles = null;
              this.nombre = "";
              this.apellido = "";
              this.pais = "";
              this.fecha = null;
              this.password = "";
              this.urlfoto = "assets/no-image.png";
              this.model = ""
              this.exampleHeader = ""
              this.selectedviewValue = "";
              this.hide = true;
              this.hide1 = true;
              this.contra = "";
            })
          ////crear carro

          this.serviceUpload.getId(this.correo).subscribe((res) => {
            this.idUser= res;
            this.carroService.crearCarro(this.idUser.id).subscribe((res)=>{});
            this.correoservice.CorreoConfirmacion(this.idUser.id,this.correo).subscribe((res)=>{});
          });
          alert("Cambios Guardados, Se ha registrado exitosamente!");
          this.route.navigate(["login"]);
        })
        ////confirmacion de registro por correo electronico

        
      } else {
        alert("Uno de los campos no se ha llenado")
      }
    } else {
      alert("Contraseñas no coinciden, verificar");
    }
  }

  onPhotoSelected(event: HtmlInputEvent, e: any): void {
    e.preventDefault();
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      this.uploadedFiles = e.target.files;

      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
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