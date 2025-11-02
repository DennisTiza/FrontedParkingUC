import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { parqueaderoService } from '../../../services/parqueadero.service';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { ParqueaderoModel } from '../../../models/parqueadero.model';

@Component({
  selector: 'app-disponibilidad',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './disponibilidad.html',
  styleUrl: './disponibilidad.css'
})
export class Disponibilidad implements OnInit{
    sesionActiva: boolean = false;
    private subscription?: Subscription;
    mostrarModal = false;
    vehicle:any[] = [];
    private parqueaderoId?: number;

  constructor(
    private authService: AuthService,
    private parqueaderoService: parqueaderoService
  ) {}

  ngOnInit(): void {
    // Tomar parqueadero del localStorage 
    const sesion = localStorage.getItem('sesion');
    this.parqueaderoId = sesion ? JSON.parse(sesion).parqueadero : null;

    this.subscription = this.authService.sesionActiva$.subscribe(
      datos => {
        // Verificar si hay token válido
        this.sesionActiva = !!datos.access_token;
      }
    );

    // Suscribirse al observable del parqueadero
    this.parqueaderoService.parqueadero$.subscribe({
      next: (data) => {
        if (data) {
          this.vehicle = this.transformToVehicleAvailability(data);
        }
      }
    });

    // Cargar parqueadero inicial
    if (this.parqueaderoId) {
      this.parqueaderoService.refrescarParqueadero(this.parqueaderoId);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  refrescarDatos() {
    if (this.parqueaderoId) {
      this.parqueaderoService.refrescarParqueadero(this.parqueaderoId);
    }
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
    if (available === 0) return 'Lleno';
    if (available / capacity <= 0.2) return 'Casi lleno';
    return 'Disponible';
  }

  abrirModal() {
    this.mostrarModal = true;

    // Cuando se abre el modal, refrescamos los datos
    const sesion = localStorage.getItem('sesion');
    const parqueaderoId = sesion ? JSON.parse(sesion).parqueadero : null;
    
    if (parqueaderoId) {
      this.parqueaderoService.refrescarParqueadero(parqueaderoId);
    }
  }
}
