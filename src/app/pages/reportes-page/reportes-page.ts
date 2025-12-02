import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReporteService } from '../../services/reporte.service';
import { ReporteModel } from '../../models/reporte.model';

@Component({
  selector: 'app-reportes-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reportes-page.html',
  styleUrl: './reportes-page.css'
})
export class ReportesPage implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  errorMessage: string = '';
  successMessage: string = '';

  tiposReporte = ['OCUPACION', 'TIPO_VEHICULO'];
  periodicidades = ['DIARIO', 'SEMANAL', 'MENSUAL'];
  tiposVehiculo = ['MOTO', 'CARRO'];

  constructor(
    private fb: FormBuilder,
    private reporteService: ReporteService
  ) { }

  ngOnInit(): void {
    this.construirFormulario();
    this.configurarCambioTipoReporte();
  }

  construirFormulario(): void {
    this.fGroup = this.fb.group({
      tipoReporte: ['', [Validators.required]],
      tipoVehiculo: [''], // Opcional por defecto
      periodicidad: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]]
    }, {
      validators: this.validarRangoFechas.bind(this)
    });
  }

  configurarCambioTipoReporte(): void {
    this.fGroup.get('tipoReporte')?.valueChanges.subscribe((valor) => {
      const tipoVehiculoControl = this.fGroup.get('tipoVehiculo');

      if (valor === 'TIPO_VEHICULO') {
        // Si se selecciona "Tipo de vehículo", hacerlo requerido
        tipoVehiculoControl?.setValidators([Validators.required]);
      } else {
        // Si no, quitar validación y limpiar valor
        tipoVehiculoControl?.clearValidators();
        tipoVehiculoControl?.setValue('');
      }

      tipoVehiculoControl?.updateValueAndValidity();
    });
  }

  /**
   * Validador personalizado para verificar que la fecha de inicio no sea mayor a la fecha fin
   */
  validarRangoFechas(group: AbstractControl): ValidationErrors | null {
    const fechaInicio = group.get('fechaInicio')?.value;
    const fechaFin = group.get('fechaFin')?.value;

    if (!fechaInicio || !fechaFin) {
      return null; // No validar si no hay valores
    }

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    if (inicio > fin) {
      return { rangoFechasInvalido: true };
    }

    return null;
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }

  generarReporte(): void {
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
    const datos: ReporteModel = {
      tipoReporte: campos['tipoReporte'].value,
      periodicidad: campos['periodicidad'].value,
      fechaInicio: new Date(campos['fechaInicio'].value),
      fechaFin: new Date(campos['fechaFin'].value),
      tipoVehiculo: campos['tipoVehiculo'].value
    };

    if (datos.periodicidad === 'DIARIO') {
      this.reporteService.generarReporteDiario(datos).subscribe({
        next: (blob) => {
          this.reporteService.downloadBlob(blob, 'reporte_diario.pdf');
          this.successMessage = 'Reporte generado correctamente, verifica tus archivos descargados.';
          this.fGroup.reset();
        },
        error: (err) => {
          this.errorMessage = `Error al generar el reporte. ${err?.error?.message || err.message}`;
        }
      });
    } else if (datos.periodicidad === 'SEMANAL' && datos.tipoReporte === 'OCUPACION') {
      this.reporteService.generarReporteSemanalXParqueadero(datos).subscribe({
        next: (blob) => {
          this.reporteService.downloadBlob(blob, 'reporte_semanal_ocupacion.pdf');
          this.successMessage = 'Reporte generado correctamente, verifica tus archivos descargados.';
          this.fGroup.reset();
        },
        error: (err) => {
          this.errorMessage = `Error al generar el reporte. ${err?.error?.message || err.message}`;
        }
      });
    } else if (datos.periodicidad === 'MENSUAL' && datos.tipoReporte === 'OCUPACION') {
      this.reporteService.generarReporteMensualXParqueadero(datos).subscribe({
       next: (blob) => {
          this.reporteService.downloadBlob(blob, 'reporte_mensual_ocupacion.pdf');
          this.successMessage = 'Reporte generado correctamente, verifica tus archivos descargados.';
          this.fGroup.reset();
        },
        error: (err) => {
          this.errorMessage = `Error al generar el reporte. ${err?.error?.message || err.message}`;
        }
      });
    } else if (datos.periodicidad === 'SEMANAL' && datos.tipoReporte === 'TIPO_VEHICULO') {
      this.reporteService.generarReporteSemanalxTipo(datos).subscribe({
        next: (blob) => {
          this.reporteService.downloadBlob(blob, 'reporte_semanal_tipo_vehiculo.pdf');
          this.successMessage = 'Reporte generado correctamente, verifica tus archivos descargados.';
          this.fGroup.reset();
        },
        error: (err) => {
          this.errorMessage = `Error al generar el reporte. ${err?.error?.message || err.message}`;
        }
      });
    } else if (datos.periodicidad === 'MENSUAL' && datos.tipoReporte === 'TIPO_VEHICULO') {
      this.reporteService.generarReporteMensualxTipo(datos).subscribe({
        next: (blob) => {
          this.reporteService.downloadBlob(blob, 'reporte_mensual_tipo_vehiculo.pdf');
          this.successMessage = 'Reporte generado correctamente, verifica tus archivos descargados.';
          this.fGroup.reset();
        },
        error: (err) => {
          this.errorMessage = `Error al generar el reporte. ${err?.error?.message || err.message}`;
        }
      });
    }
  }
}



