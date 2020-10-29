import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })
  ///////////////////////////////////////CONSULTAS///////////////////////////////////////////

  CorreoConfirmacion(id: number, correo: string) {
    const url = 'http://192.168.1.15:3000/correo/confirmacion';
    return this.http.post(url,
      {
        "id": id,
        "correo": correo
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  CorreoRecuperacion(id: any, correo: any) {

    const url = 'http://192.168.1.15:3000/correo/recuperacion';

    return this.http.post(url,
      {
        "id": id,
        "correo": correo
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
}
