import { Injectable } from '@angular/core';
import { ConfiguracionRutas } from '../config/configuracion.rutas';
import { Observable } from 'rxjs';
import { SalidaModel } from '../models/salida.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalidaService {
  constructor(private http: HttpClient) { }

  urlBackend: string = ConfiguracionRutas.urlBackend;

  registrarSalida(datos: SalidaModel): Observable<any> {
    return this.http.post(`${this.urlBackend}salida`, datos);
  }

}
