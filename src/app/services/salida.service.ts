import { Injectable } from '@angular/core';
import { ConfiguracionRutas } from '../config/configuracion.rutas';
import { Observable } from 'rxjs';
import { SalidaModel } from '../models/salida.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalidaService {
  constructor(private http: HttpClient) { }

  urlBackend: string = ConfiguracionRutas.urlBackend;

  registrarSalida(datos: SalidaModel, placa: string): Observable<any> {
    const sesion = JSON.parse(localStorage.getItem('sesion') || '{}');
    const token = sesion?.access_token || '';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.patch(`${this.urlBackend}registro/vehiculo/${placa}/salida`, datos, { headers });
  }

}
