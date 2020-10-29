import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { isNullOrUndefined } from 'util';
import { UserInterface } from '../components/models/user.interface'
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

  /////////////////////////////////////////CONSULTAS////////////////////////////////////////
  uploadFile(formData) {
    let urlApi = 'http://192.168.1.15:3000/foto';
    return this.http.post(urlApi, formData);
  }
  InsertUser(Nombre: string, Apellido: string, Pais: string, Correo: string, Fecha: string, Password: string, urlfoto: string, tipousuario: number) {
    const url = 'http://192.168.1.15:3000/addUser';
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
        "tipousuario": tipousuario
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }
  /* Este me servira para conseguir el id del usuario */
  CorreoId(correo) {
    const url = "http://192.168.1.15:3000/correo/Id";
    return this.http.post(url,
      {
        "correo_electronico": correo
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  getId(correo: string) {
    const url = "http://192.168.1.15:3000/getId";
    return this.http.post(url,
      {
        "correo_electronico": correo
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  confirmarCorreo(id) {

    const url = "http://192.168.1.15:3000/confirmar/Correo";
    return this.http.post(url,
      {
        "id": id
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  cambiarContra(id: any, pass: any) {
    const url = "http://192.168.1.15:3000/cambiar/contra";
    return this.http.put(url,
      {
        "correo_electronico": id,
        "contrasena": pass
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  Loginin(username,pass)
  {
    const url="http://192.168.1.15:3000/login";
    return this.http.post(url,
      {
        "correo_electronico": username,
        "contrasena":pass
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  //////////////////////////////////////LOCAL STORAGE /////////////////////////////////////
  setUser(user: Perfil) {
    let userString = JSON.stringify(user);
    localStorage.setItem("usuarioLogeado", userString);
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
  ////////////////////////////////////////////////////////////////////////////////

}
