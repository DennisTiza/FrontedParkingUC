import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EntradaService } from '../../services/entrada.service';
import { EntradaModel } from '../../models/entrada.model';

@Component({
  selector: 'app-registrar-entrada',
  standalone: true, // importante para componentes sin AppModule
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entrada-page.html', 
  styleUrl: './entrada-page.css'
})
export class EntradaPage implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  horaActual: string = '';

  constructor(
    private fb: FormBuilder,
    private EntradaService: EntradaService
  ) {}

  ngOnInit(): void {
    this.construirFormulario();
    this.setHoraActual();
  }

  construirFormulario(): void {
    this.fGroup = this.fb.group({
      tipoVehiculo: ['', Validators.required],
      placa: ['', [Validators.required, Validators.minLength(4)]],
      hora: [{ value: '', disabled: true }]
    });
  }

  setHoraActual(): void {
    const fecha = new Date();
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    this.horaActual = `${horas}:${minutos}`;
    this.fGroup.patchValue({ hora: this.horaActual });
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }

  registrarEntrada(): void {
    if (this.fGroup.invalid) {
      alert('Por favor complete los campos requeridos.');
      return;
    }

    const campos = this.ObtenerFormGroup;
    const datos: EntradaModel = {
      tipoVehiculo: campos['tipoVehiculo'].value,
      placa: campos['placa'].value,
      hora: new Date()
    };

    this.EntradaService.registrarEntrada(datos).subscribe({
      next: () => {
        alert('Entrada registrada correctamente');
        this.fGroup.reset();
        this.setHoraActual();
      },
      error: (err) => {
        console.error('Error al registrar entrada:', err);
        alert('Error al registrar la entrada');
      }
    });
  }
}
