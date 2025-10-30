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

  getParqueaderoById(id: number) {
    return this.http.get<ParqueaderoModel>(`${this.urlBackend}parqueadero/${id}`);
  }

  transformToVehicleAvailability(parkingData: ParqueaderoModel) {
    const availableCarros = parkingData.cuposDisponiblesCarros ?? 0;
    const capacidadCarros = parkingData.capacidadCarros ?? 1;
    const availableMotos = parkingData.cuposDisponiblesMotos ?? 0;
    const capacidadMotos = parkingData.capacidadMotos ?? 1;

    return [
      {
        type: 'Carros',
        available: availableCarros,
        status: this.getStatus(availableCarros, capacidadCarros)
      },
      {
        type: 'Motocicletas',
        available: availableMotos,
        status: this.getStatus(availableMotos, capacidadMotos)
      }
    ];
  }
  private getStatus(available: number, capacity: number): string {
    if (capacity <= 0) {
      return available === 0 ? 'Lleno' : 'Disponible';
    }
    if (available === 0) {
      return 'Lleno';
    } else if (available / capacity <= 0.2) {
      return 'Casi Lleno';
    } else {
      return 'Disponible';
    }
  }
}
