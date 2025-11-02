import { Injectable } from '@angular/core';
import { ConfiguracionRutas } from '../config/configuracion.rutas';
import { HttpClient } from '@angular/common/http';
import { ParqueaderoModel } from '../models/parqueadero.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class parqueaderoService {
  urlBackend: string = ConfiguracionRutas.urlBackend;
  private parqueaderoSubject = new BehaviorSubject<ParqueaderoModel | null>(null);
  public parqueadero$ = this.parqueaderoSubject.asObservable();

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

  getParqueaderoById(id: number) {
    return this.http.get<ParqueaderoModel>(`${this.urlBackend}parqueadero/${id}`).pipe(
      tap((data) => this.parqueaderoSubject.next(data)) // actualiza el observable
    );
  }

  /** Método para forzar actualización desde cualquier parte */
  refrescarParqueadero(id: number) {
    this.getParqueaderoById(id).subscribe();
  }

}
