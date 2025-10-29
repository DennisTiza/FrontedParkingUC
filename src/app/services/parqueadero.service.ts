import { Injectable } from '@angular/core';
import { ConfiguracionRutas } from '../config/configuracion.rutas';
import { HttpClient } from '@angular/common/http';
import { ParqueaderoModel } from '../models/parqueadero.model';

@Injectable({
  providedIn: 'root'
})
export class parqueaderoService {
  urlBackend: string = ConfiguracionRutas.urlBackend;
  
  constructor(private http: HttpClient) {}

  getParqueaderos() {
    return this.http.get(`${this.urlBackend}parqueadero`);
  }

  setParqueadero(parqueadero: any) {
  const sesionString = localStorage.getItem('sesion');

  if (!sesionString) return;

  const sesion = JSON.parse(sesionString);

  sesion.parqueadero = parqueadero;
  
  localStorage.setItem('sesion', JSON.stringify(sesion));
}
}
