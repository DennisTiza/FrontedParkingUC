import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from '../../services/vehiculo.service';
import { VehiculoModel } from '../../models/vehiculo.model';

@Component({
  selector: 'app-editar-vehiculo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-vehiculo-page.html',
  styleUrl: './editar-vehiculo-page.css'
})
export class EditarVehiculoPage implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  errorMessage: string = '';
  successMessage: string = '';
  placa: string = '';
  cargando: boolean = true;

  tiposVehiculo = ['CARRO', 'MOTO'];

  constructor(
    private fb: FormBuilder,
    private vehiculoService: VehiculoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.construirFormulario();
    this.placa = this.route.snapshot.params['placa'];
    this.cargarVehiculo();
  }

  construirFormulario(): void {
    this.fGroup = this.fb.group({
      placa: [{ value: '', disabled: true }], // Placa deshabilitada porque no se puede cambiar
      tipo: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      color: ['', [Validators.required]],
      fechaCaducidad: ['', [Validators.required]],
      conductorCodigo: ['', [Validators.required]]
    });
  }

  cargarVehiculo(): void {
    this.vehiculoService.obtenerVehiculoPorplaca(this.placa).subscribe({
      next: (vehiculo: VehiculoModel) => {
        this.fGroup.patchValue({
          placa: vehiculo.placa,
          tipo: vehiculo.tipo,
          marca: vehiculo.marca,
          modelo: vehiculo.modelo,
          color: vehiculo.color,
          fechaCaducidad: vehiculo.fechaCaducidad,
          conductorCodigo: vehiculo.conductorCodigo
        });
        this.cargando = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los datos del vehículo';
        this.cargando = false;
        console.error(err);
      }
    });
  }
 //
  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }

  actualizarVehiculo(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.fGroup.invalid) {
      this.errorMessage = 'Por favor complete todos los campos requeridos.';
      Object.keys(this.fGroup.controls).forEach(key => {
        this.fGroup.controls[key].markAsTouched();
      });
      return;
    }

    const campos = this.ObtenerFormGroup;
    const datos: VehiculoModel = {
      placa: this.placa,
      tipo: campos['tipo'].value,
      marca: campos['marca'].value,
      modelo: campos['modelo'].value,
      color: campos['color'].value,
      fechaCaducidad: campos['fechaCaducidad'].value,
      conductorCodigo: campos['conductorCodigo'].value
    };

    this.vehiculoService.actualizarVehiculo(this.placa, datos).subscribe({
      next: () => {
        this.successMessage = 'Vehículo actualizado correctamente';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/gestion-vehiculo']);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Error al actualizar el vehículo';
        this.successMessage = '';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gestion-vehiculo']);
  }
}