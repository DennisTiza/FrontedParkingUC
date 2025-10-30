import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { parqueaderoService } from '../../../services/parqueadero.service';

@Component({
  selector: 'app-disponibilidad',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './disponibilidad.html',
  styleUrl: './disponibilidad.css'
})
export class Disponibilidad implements OnInit{
  constructor(
    private parqueaderoService: parqueaderoService
  ) {}
  mostrarModal = false;
  vehicle:any[] = [];
  ngOnInit(): void { 
    // this.parqueaderoService.getVehicleAvailability().subscribe(data => {
    //   this.vehicle = this.parqueaderoService.transformToVehicleAvailability(data) || [];
    // });
  }


  vehicleAvailability = [
    { type: 'Carros', available: 3, status: 'Disponible' },
    { type: 'Motocicletas', available: 25, status: 'Disponible' }
  ];
}
