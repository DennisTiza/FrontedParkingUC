import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntradaModel } from '../models/entrada.model';
import { ConfiguracionRutas } from '../config/configuracion.rutas';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {
  private url = ConfiguracionRutas.urlBackend

  constructor(private http: HttpClient) {}

  registrarEntrada(data: EntradaModel): Observable<EntradaModel> {
    return this.http.post<EntradaModel>(`${this.url}entradas`, data);
  }
}
