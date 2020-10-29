import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CorreoService } from 'src/app/services/correo.service';
import { UploadService } from 'src/app/services/upload.service';
import { Perfil } from '../models/perfil';

@Component({
  selector: 'app-forgotemail',
  templateUrl: './forgotemail.component.html',
  styleUrls: ['./forgotemail.component.css']
})
export class ForgotemailComponent implements OnInit {
  correo: string = "";
  constructor(public dialog: MatDialog,public userservice: UploadService, private correoService: CorreoService) { }

  ngOnInit(): void {
  }
  Recuperar() {
    this.userservice.CorreoId(this.correo).subscribe((res) => {
      let data: Perfil = res;
      if (data.id == 0) {
        alert("El correo no es valido");
        this.correo=""
        return;
      }
      this.correoService.CorreoRecuperacion(data.id,this.correo).subscribe((res)=>{});
      alert("correo de recuperacion enviado!");
      this.correo=""
      this.dialog.closeAll();
    });
  }
}
