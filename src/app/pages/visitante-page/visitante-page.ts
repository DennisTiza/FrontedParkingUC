import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { VisitanteService } from '../../services/visitante.service';
import { VisitanteModel } from '../../models/visitante.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visitante-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './visitante-page.html',
  styleUrl: './visitante-page.css'
})
export class VisitantePage {
  fGroup: FormGroup = new FormGroup({});
  errorMessage: string = '';
  successMessage: string = '';

  tiposVehiculo = ['CARRO', 'MOTO'];

  constructor(
    private fb: FormBuilder,
    private visitanteService: VisitanteService
  ) {}

  ngOnInit(): void {
    this.construirFormulario();
  }

  construirFormulario(): void {
    this.fGroup = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      tipoVehiculo: ['', [Validators.required]],
      placa: ['', [Validators.required, Validators.minLength(4)]],
      motivo: ['', [Validators.required]]
    });

    // Agregar validación de placa cuando cambie el tipo
    this.fGroup.get('tipoVehiculo')?.valueChanges.subscribe(() => {
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
    const tipo = this.fGroup?.get('tipoVehiculo')?.value;

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

  registrarVisitante(): void {
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
    const datos: VisitanteModel = {
      nombre: campos['nombre'].value,
      apellido: campos['apellido'].value,
      cedula: campos['cedula'].value,
      telefono: campos['telefono'].value,
      correo: campos['correo'].value,
      tipoVehiculo: campos['tipoVehiculo'].value,
      placa: campos['placa'].value.toUpperCase(),
      motivo: campos['motivo'].value
    };

    this.visitanteService.registrarVisitante(datos).subscribe({
      next: () => {
        alert('Visitante registrado correctamente');
        this.fGroup.reset();
      },
      error: (err) => {
        alert(`Error al registrar el visitante. \n${err?.error?.message || err.message}`);
      }
    });
  }
}