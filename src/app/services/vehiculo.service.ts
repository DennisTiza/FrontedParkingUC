import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehiculoModel } from '../models/vehiculo.model';
import { ConfiguracionRutas } from '../config/configuracion.rutas';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  urlBackend: string = ConfiguracionRutas.urlBackend;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const sesion = JSON.parse(localStorage.getItem('sesion') || '{}');
    const token = sesion?.access_token || '';

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  registrarVehiculo(data: VehiculoModel): Observable<VehiculoModel> {
    return this.http.post<VehiculoModel>(
      `${this.urlBackend}vehiculo`, 
      data, 
      { headers: this.getHeaders() }
    );
  }

  obtenerVehiculos(): Observable<VehiculoModel[]> {
    return this.http.get<VehiculoModel[]>(
      `${this.urlBackend}vehiculo`, 
      { headers: this.getHeaders() }
    );
  }

  obtenerVehiculoPorplaca(placa: string): Observable<VehiculoModel> {
    return this.http.get<VehiculoModel>(
      `${this.urlBackend}vehiculo/${placa}`, 
      { headers: this.getHeaders() }
    );
  }

  actualizarVehiculo(placa: string, data: VehiculoModel): Observable<VehiculoModel> {
    return this.http.patch<VehiculoModel>(
      `${this.urlBackend}vehiculo/${placa}`, 
      data, 
      { headers: this.getHeaders() }
    );
  }

  eliminarVehiculo(placa: string): Observable<any> {
    return this.http.delete(
      `${this.urlBackend}vehiculo/${placa}`, 
      { headers: this.getHeaders() }
    );
  }
}