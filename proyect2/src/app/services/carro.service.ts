import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class CarroService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })
  ///////////////////////////////////////CONSULTAS///////////////////////////////////////////
  crearCarro(usuario:number)
  {
    return this.http.post('http://192.168.1.15:3000/crear/carro',
    {
       "usuario":usuario
       
    }, { headers: this.headers })
     .pipe(map(data => data));
  }
  VerificarProducto(producto, usuario){
    //este me servira para saber si ya existe en el carrito de compras(detalle_compras)
    const url = "http://192.168.1.15:3000/VerificarProducto";
    return this.http.post(url,
      {
        "producto": producto,
        "usuario": usuario
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  AddCarrito(subtotal, producto, idcompra){
    const url = "http://192.168.1.15:3000/addCarrito";
    return this.http.post(url,
      {
        "subtotal": subtotal,
        "producto": producto,
        "idcompra": idcompra
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  getIdCarrito(usuario) {
    const url = "http://192.168.1.15:3000/idCarrito";
    return this.http.post(url,
      {
        "usuario": usuario
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  mostrarCarrito(usuario) {
    const url = "http://192.168.1.15:3000/mostrarCarrito";
    return this.http.post(url,
      {
        "usuario": usuario
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
}
