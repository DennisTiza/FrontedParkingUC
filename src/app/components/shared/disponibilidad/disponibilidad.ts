import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { parqueaderoService } from '../../../services/parqueadero.service';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-disponibilidad',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './disponibilidad.html',
  styleUrl: './disponibilidad.css'
})
export class Disponibilidad implements OnInit{
    sesionActiva: boolean = false;
    private subscription?: Subscription;
    
  constructor(
    private authService: AuthService,
    private parqueaderoService: parqueaderoService
  ) {}
  mostrarModal = false;
  vehicle:any[] = [];
  ngOnInit(): void { 
    this.subscription = this.authService.sesionActiva$.subscribe(
      datos => {
        // Verificar si hay token válido
        this.sesionActiva = !!datos.access_token;
      }
    );
    // this.parqueaderoService.getVehicleAvailability().subscribe(data => {
    //   this.vehicle = this.parqueaderoService.transformToVehicleAvailability(data) || [];
    // });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


  vehicleAvailability = [
    { type: 'Carros', available: 3, status: 'Disponible' },
    { type: 'Motocicletas', available: 25, status: 'Disponible' }
  ];
}
