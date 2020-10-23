import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';
import {ForgotemailComponent} from '../forgotemail/forgotemail.component'
import { Perfil } from '../models/perfil';
import { UserInterface } from '../models/user.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  correo: string="";
  contra: string="";
  
  constructor(public dialog: MatDialog, private Userservices:UploadService) {}

  openDialog() {
    this.dialog.open(ForgotemailComponent);
  }
  ngOnInit(): void {
  }
  Importando(){
    let data:Perfil={id:12};
    console.log(data)
    this.Userservices.setUser(data);
  }
}


