import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntradaModel } from '../models/entrada.model';
import { ConfiguracionRutas } from '../config/configuracion.rutas';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {
  urlBackend: string = ConfiguracionRutas.urlBackend;

  constructor(private http: HttpClient) {}

  registrarEntrada(data: EntradaModel): Observable<EntradaModel> {
    const sesion = JSON.parse(localStorage.getItem('sesion') || '{}');
    const token = sesion?.access_token || '';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<EntradaModel>(`${this.urlBackend}registro`, data, { headers });
  }
}
