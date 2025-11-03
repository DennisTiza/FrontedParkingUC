import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehiculoService } from '../../services/vehiculo.service';
import { VehiculoModel } from '../../models/vehiculo.model';

@Component({
  selector: 'app-vehiculo-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vehiculo-page.html',
  styleUrl: './vehiculo-page.css'
})
export class VehiculoPage implements OnInit {
  fGroup: FormGroup = new FormGroup({});

  tiposVehiculo = ['CARRO', 'MOTO'];

  constructor(
    private fb: FormBuilder,
    private vehiculoService: VehiculoService
  ) {}

  ngOnInit(): void {
    this.construirFormulario();
  }

  construirFormulario(): void {
    this.fGroup = this.fb.group({
      placa: ['', [Validators.required, Validators.minLength(4)]],
      tipo: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      color: ['', [Validators.required]],
      fechaCaducidad: ['', [Validators.required]],
      conductorCodigo: ['', [Validators.required]]
    });
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }

  registrarVehiculo(): void {
    if (this.fGroup.invalid) {
      alert('Por favor complete todos los campos requeridos.');
      return;
    }

    const campos = this.ObtenerFormGroup;
    const datos: VehiculoModel = {
      placa: campos['placa'].value,
      tipo: campos['tipo'].value,
      marca: campos['marca'].value,
      modelo: campos['modelo'].value,
      color: campos['color'].value,
      fechaCaducidad: campos['fechaCaducidad'].value,
      conductorCodigo: campos['conductorCodigo'].value
    };

    this.vehiculoService.registrarVehiculo(datos).subscribe({
      next: () => {
        alert('Vehículo registrado correctamente');
        this.fGroup.reset();
      },
      error: (err) => {
        alert(`Error al registrar el vehículo. \n${err?.error?.message || err.message}`);
      }
    });
  }
}