import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { isNullOrUndefined } from 'util';
import {UserInterface} from '../components/models/user.interface'
import { Perfil } from '../components/models/perfil';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  //String BASE_URL = "http://192.168.1.15:4200";
  constructor(private http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })
  uploadFile(formData) {
    let urlApi = 'http://192.168.1.15:3001/foto';
    return this.http.post(urlApi, formData);
  }
  InsertUser(Nombre: string, Apellido: string, Pais: string, Correo: string, Fecha: string, Password: string, urlfoto: string) {
    const url = 'http://192.168.1.15:3001/addUser';
    console.log(Nombre, Apellido, Correo)
    return this.http.post(url,
      {
        "nombre": Nombre,
        "apellido": Apellido,
        "correo_electronico": Correo,
        "contrasena": Password,
        "fecha_nacimiento": Fecha,
        "pais": Pais,
        "foto": urlfoto,
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }
  setUser(user:Perfil) {
    let userString=JSON.stringify(user);
    localStorage.setItem("usuarioLogeado",userString);
    //this.cookies.set("token", token);
  }
  getUser() {
    let usuario = localStorage.getItem('usuarioLogeado');
    if (!isNullOrUndefined(usuario)) {
      let user_JSON = JSON.parse(usuario);
      // console.log(user_JSON);
      return user_JSON;
    } else {
      return null;


    }
  }

}
