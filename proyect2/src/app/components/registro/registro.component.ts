import { Component, OnInit, ɵConsole } from '@angular/core';
import { UploadService } from "../../services/upload.service";
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { UserInterface } from '../models/user.interface';
import { from } from 'rxjs';
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


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
  uploadedFiles: Array<File>;
  nombre: string = "";
  apellido: string = "";
  pais: string = "";
  fecha: Date
  correo: string = "";
  password: string = "";
  urlfoto: string = "archivos/no-image.png";
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
  SelectedPais() {
    var cod = document.getElementById("pais");
    alert(cod);

  }
  ngOnInit(): void {

  }
  constructor(private serviceUpload: UploadService, private http: HttpClient) { }

  onUpload(e) {
    e.preventDefault()
    let formData = new FormData();
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    /*this.serviceUpload.descargaPhoto(formData).subscribe((res)=> {
      console.log('response received is ',res);
    })*/

    this.serviceUpload.uploadFile(formData).subscribe((res) => {
      console.log('response received is ', JSON.stringify(res));
      let temporal = JSON.stringify(res).split("\"", 4);
      this.urlfoto = temporal[3];
    });

    //alert("Su información ha sido enviada a su correo verifique en en breves momentos");
  }

  onFileChange(e) {
    e.preventDefault()
    this.uploadedFiles = e.target.files;
  }
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
          this.urlfoto = temporal[3];
        });
      }

      if (this.nombre != "" && this.apellido != "" && this.fecha != null && this.correo != "" && this.urlfoto != "" && this.pais != "" && this.contra != "") {

        let date = this.fecha.getFullYear() + "/" + (this.fecha.getMonth() + 1) + '/' + this.fecha.getDate();
        this.serviceUpload.InsertUser(this.nombre, this.apellido, this.pais, this.correo, date, this.contra, this.urlfoto)
          .subscribe((res: UserInterface[]) => {
            console.log("RESPUESTA SIN MAS NI MAS ", res);
            this.Usuario = res;
            console.log("EN PAGINA WEG", this.Usuario);
            this.codu = "";
            this.uploadedFiles = null;
            this.nombre = "";
            this.apellido = "";
            this.pais = "";
            this.fecha = null;
            this.correo = "";
            this.password = "";
            this.urlfoto = "archivos/no-image.png";
            this.model = ""
            this.exampleHeader = ""
            this.selectedviewValue = "";
            this.hide = true;
            this.hide1 = true;
            this.contra = "";
          })
        //UPDATE PASOFDATE SET ASOFDATE = TO_DATE('11/21/2012', 'MM/DD/YYYY');
        //(TO_DATE('2003/05/03 21:02:44', 'yyyy/mm/dd hh24:mi:ss'));
        console.log(this.nombre, this.apellido, date, this.correo, this.contra, this.urlfoto, this.pais)
        alert("Cambios Guardados, Se ha registrado exitosamente!");

      } else {
        //alert("Uno de los campos no se ha llenado")
      }
    } else {
      //alert("Contraseñas no coinciden, verificar");
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
