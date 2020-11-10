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
  Loginin(username, pass) {
    const url = "http://192.168.1.15:3000/login";
    return this.http.post(url,
      {
        "correo_electronico": username,
        "contrasena": pass
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  Modify(Nombre: string, Apellido: string, Pais: string, Correo: string, Fecha: string, Password: string, urlfoto: string) {
    const url = 'http://192.168.1.15:3000/modifyUser';
    console.log(Nombre, Apellido, Correo)
    return this.http.put(url,
      {
        "nombre": Nombre,
        "apellido": Apellido,
        "correo_electronico": Correo,
        "contrasena": Password,
        "fecha_nacimiento": Fecha,
        "pais": Pais,
        "foto": urlfoto
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }
  darBaja(id) {

    const url = "http://192.168.1.15:3000/user/baja";
    return this.http.put(url,
      {
        "id": id
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  AddPalabraClave(nombre, producto) {

    const url = "http://192.168.1.15:3000/addpalabraclave";
    return this.http.post(url,
      {
        "nombre": nombre,
        "producto": producto
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  ListPalabraClave() {
    const url = "http://192.168.1.15:3000/Listpalabraclave";
    return this.http.get(url);
  }
  ListPalabraClavemodify(idproducto) {
    const url = "http://192.168.1.15:3000/modifypalabraclave";
    return this.http.post(url,
      {
        "idproducto": idproducto
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  ListCategoria() {
    const url = "http://192.168.1.15:3000/ListCategoria";
    return this.http.get(url);
  }
  AddProducto(nombre: string, precio: number, foto: string, descripcion: string, estado: number, categoria: string) {
    const url = "http://192.168.1.15:3000/addProducto";
    return this.http.post(url,
      {
        "nombre": nombre,
        "precio": precio,
        "foto": foto,
        "detalle_producto": descripcion,
        "estado": estado,
        "categoria": categoria
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }
  getidProducto(nombre, precio) {
    const url = "http://192.168.1.15:3000/getidProducto";
    return this.http.post(url,
      {
        "nombre": nombre,
        "precio": precio
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  mostrarProducto(usuario) {
    const url = "http://192.168.1.15:3000/mostrarProducto";
    return this.http.post(url,
      {
        "usuario": usuario
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  mostrarPublicacion(usuario){
    const url = "http://192.168.1.15:3000/mostrarPublicacion";
    return this.http.post(url,
      {
        "usuario": usuario
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  modificarProducto(nombre, precio, foto, detalle_producto, categoria, id) {
    const url = "http://192.168.1.15:3000/modifyProduct";
    return this.http.post(url,
      {
        "nombre": nombre,
        "precio": precio,
        "foto": foto,
        "detalle_producto": detalle_producto,
        "categoria": categoria,
        "id": id
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  addVenta(idusuario) {
    const url = "http://192.168.1.15:3000/addVenta";
    return this.http.post(url,
      {
        "usuario": idusuario
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  getidVenta(idusuario) {
    const url = "http://192.168.1.15:3000/getidVenta";
    return this.http.post(url,
      {
        "usuario": idusuario
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  Detalle_Venta(subtotal: number, producto: number, idVenta: number) {
    const url = "http://192.168.1.15:3000/addDetalleVenta";
    return this.http.post(url,
      {
        "subtotal": subtotal,
        "producto": producto,
        "venta": idVenta
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  eliminarProducto(idproducto) {
    const url = "http://192.168.1.15:3000/deleteProduct";
    return this.http.put(url,
      {
        "idproducto": idproducto
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  AscendentePublicacion(usuario){
    const url = "http://192.168.1.15:3000/ascendentePublicacion";
    return this.http.post(url,
      {
        "usuario": usuario
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  DescendentePublicacion(usuario){
    const url = "http://192.168.1.15:3000/descendentePublicacion";
    return this.http.post(url,
      {
        "usuario": usuario
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  CategoriaPublicacion(usuario, categoria){
    const url = "http://192.168.1.15:3000/CategoriaPublicacion";
    return this.http.post(url,
      {
        "usuario": usuario,
        "categoria": categoria
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
  removeUser(user:Perfil){
    window.localStorage.removeItem('usuarioLogeado');
    let userString = JSON.stringify(user);
    window.localStorage.removeItem(userString);
    window.localStorage.clear();
  }

  ////////////////////////////////////////////////////////////////////////////////

}
