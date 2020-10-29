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
    console.log("MIRAME MIRAME MIRAME  ", usuario)
    return this.http.post('http://192.168.1.15:3000/crear/carro',
    {
       "usuario":usuario
       
    }, { headers: this.headers })
     .pipe(map(data => data));
  }
}
