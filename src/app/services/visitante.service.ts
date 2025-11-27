import { Injectable } from '@angular/core';
import { ConfiguracionRutas } from '../config/configuracion.rutas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VisitanteModel } from '../models/visitante.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitanteService {
  urlBackend: string = ConfiguracionRutas.urlBackend;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const sesion = JSON.parse(localStorage.getItem('sesion') || '{}');
    const token = sesion?.access_token || '';

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  registrarVisitante(data: VisitanteModel): Observable<VisitanteModel> {
    return this.http.post<VisitanteModel>(
      `${this.urlBackend}visitante`, 
      data, 
      { headers: this.getHeaders() }
    );
  }

  obtenerVisitantes(): Observable<VisitanteModel[]> {
    return this.http.get<VisitanteModel[]>(
      `${this.urlBackend}visitante`, 
      { headers: this.getHeaders() }
    );
  }

  obtenerVisitantePorCedula(cedula: string): Observable<VisitanteModel> {
    return this.http.get<VisitanteModel>(
      `${this.urlBackend}visitante/${cedula}`, 
      { headers: this.getHeaders() }
    );
  }

  actualizarVisitante(cedula: string, data: VisitanteModel): Observable<VisitanteModel> {
    return this.http.patch<VisitanteModel>(
      `${this.urlBackend}visitante/${cedula}`, 
      data, 
      { headers: this.getHeaders() }
    );
  }

  eliminarVisitante(cedula: string): Observable<any> {
    return this.http.delete(
      `${this.urlBackend}visitante/${cedula}`, 
      { headers: this.getHeaders() }
    );
  }
}