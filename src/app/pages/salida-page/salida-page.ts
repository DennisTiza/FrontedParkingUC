import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SalidaService } from '../../services/salida.service';
import { SalidaModel } from '../../models/salida.model';
import { parqueaderoService } from '../../services/parqueadero.service';

@Component({
  selector: 'app-registrar-salida',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './salida-page.html', 
  styleUrl: './salida-page.css'
})
export class SalidaPage implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  horaActual: string = '';

  constructor(
    private fb: FormBuilder,
    private SalidaService: SalidaService,
    private parqueaderoService: parqueaderoService
  ) {}

  ngOnInit(): void {
    this.construirFormulario();
    this.setHoraActual();
  }

  construirFormulario(): void {
    this.fGroup = this.fb.group({
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

  registrarSalida(): void {
    if (this.fGroup.invalid) {
      alert('Por favor complete los campos requeridos.');
      return;
    }

    const campos = this.ObtenerFormGroup;
    const datos: SalidaModel = {
      horaSalida: new Date()
    };
    const placa = campos['placa'].value;

    this.SalidaService.registrarSalida(datos, placa).subscribe({
      next: () => {
        alert('Salida registrada correctamente');
        this.parqueaderoService.refrescarParqueadero(localStorage.getItem('sesion') ? JSON.parse(localStorage.getItem('sesion')!).parqueadero : null!);
        this.fGroup.reset();
        this.setHoraActual();
      },
      error: (err) => {
        if (err.status === 404) {
          alert(`La placa ${placa} no está registrada o no tiene una entrada asociada.`);
          return;
        }
        alert(`Error al registrar la salida. \n${err.message || err}`);
      }
    });
  }
}
