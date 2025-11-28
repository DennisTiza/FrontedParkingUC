import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
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
  errorMessage: string = '';
  successMessage: string = '';

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
      conductorCodigo: ['', [Validators.required]],
    });

    // Agregar validación de placa cuando cambie el tipo
    this.fGroup.get('tipo')?.valueChanges.subscribe(() => {
      this.fGroup.get('placa')?.updateValueAndValidity();
    });

    // Agregar validador personalizado a la placa
    this.fGroup.get('placa')?.setValidators([
      Validators.required,
      Validators.minLength(4),
      this.validarFormatoPlaca.bind(this)
    ]);
  }

  /**
   * Validador personalizado para formato de placa según tipo de vehículo
   * CARRO: ABC123 o ABC1234 (3 letras + 3 o 4 números)
   * MOTO: ABC12D o ABC12 (3 letras + 2 números + opcional 1 letra)
   */
  validarFormatoPlaca(control: AbstractControl): ValidationErrors | null {
    const placa = control.value?.toUpperCase();
    const tipo = this.fGroup?.get('tipo')?.value;

    if (!placa || !tipo) {
      return null; // No validar si no hay valor
    }

    if (tipo === 'CARRO') {
      // Formato CARRO: ABC123 o ABC1234 (3 letras + 3 o 4 números)
      const formatoCarro = /^[A-Z]{3}\d{3,4}$/;
      if (!formatoCarro.test(placa)) {
        return { formatoPlacaCarro: true };
      }
    } else if (tipo === 'MOTO') {
      // Formato MOTO: ABC12D o ABC12 (3 letras + 2 números + opcional 1 letra)
      const formatoMoto = /^[A-Z]{3}\d{2}[A-Z]?$/;
      if (!formatoMoto.test(placa)) {
        return { formatoPlacaMoto: true };
      }
    }

    return null;
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }

  registrarVehiculo(): void {
    // Limpiar mensajes previos
    this.errorMessage = '';
    this.successMessage = '';

    if (this.fGroup.invalid) {
      this.errorMessage = 'Por favor complete todos los campos correctamente.';
      // Marcar todos los campos como touched para mostrar validaciones
      Object.keys(this.fGroup.controls).forEach(key => {
        this.fGroup.controls[key].markAsTouched();
      });
      return;
    }

    const campos = this.ObtenerFormGroup;
    const datos: VehiculoModel = {
      placa: campos['placa'].value.toUpperCase(), // Convertir a mayúsculas
      tipo: campos['tipo'].value,
      marca: campos['marca'].value,
      modelo: campos['modelo'].value,
      color: campos['color'].value,
      fechaCaducidad: campos['fechaCaducidad'].value,
      propietarioId: campos['conductorCodigo'].value,
      tipoPropietario: 'INSTITUCIONAL' // Valor fijo por ahora
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