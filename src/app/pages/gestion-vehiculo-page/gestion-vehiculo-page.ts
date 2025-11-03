import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterLink } from '@angular/router';
import { VehiculoModel } from '../../models/vehiculo.model';
import { VehiculoService } from '../../services/vehiculo.service';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';

@Component({
  selector: 'app-gestion-vehiculo-page',
  imports: [RouterLink, RouterModule, FormsModule, CommonModule],
  templateUrl: './gestion-vehiculo-page.html',
  styleUrls: ['./gestion-vehiculo-page.css']
})

export class GestionVehiculoPage implements OnInit {
  vehiculos: VehiculoModel[] = [];
  vehiculosFiltrados: VehiculoModel[] = [];
  searchQuery: string = '';
  pag = 1;
  totalItems = 0;
  registrosPorPagina = ConfiguracionPaginacion.registrosPorPagina;

  constructor(private vehiculoService: VehiculoService) { }

  ngOnInit(): void {
    this.obtenerVehiculos();
  }

  obtenerVehiculos(): void {
    this.vehiculoService.obtenerVehiculos().subscribe({
      next: (respuesta: VehiculoModel[]) => {
        this.vehiculos = respuesta;
        console.log(this.vehiculos);
        this.vehiculosFiltrados = [...this.vehiculos];
        this.totalItems = this.vehiculos.length;
      },
      error: (err) => {
        alert('Error al obtener los vehículos');
        console.error(err);
      }
    });
  }

  filtrarVehiculo(): void {
    const query = this.searchQuery?.toLowerCase().trim() || '';

    if (!query) {
      this.vehiculosFiltrados = [...this.vehiculos];
    } else {
      this.vehiculosFiltrados = this.vehiculos.filter(vehiculo => {
        return vehiculo.placa?.toLowerCase().includes(query) ||
          vehiculo.tipo?.toLowerCase().includes(query) ||
          vehiculo.marca?.toLowerCase().includes(query) ||
          vehiculo.modelo?.toLowerCase().includes(query) ||
          vehiculo.color?.toLowerCase().includes(query) ||
          vehiculo.conductorCodigo?.toLowerCase().includes(query);
      });
    }

    this.totalItems = this.vehiculosFiltrados.length;
    this.pag = 1;
  }

  eliminarVehiculo(placa: string | undefined): void {
    if (!placa) {
      alert('No se puede eliminar un vehículo sin placa');
      return;
    }

    if (confirm(`¿Está seguro de eliminar el vehículo con placa ${placa}?`)) {
      this.vehiculoService.eliminarVehiculo(placa).subscribe({
        next: () => {
          alert('Vehículo eliminado correctamente');
          this.obtenerVehiculos();
        },
        error: (err) => {
          alert('Error al eliminar el vehículo');
          console.error(err);
        }
      });
    }
  }

  get vehiculosPaginados(): VehiculoModel[] {
    const inicio = (this.pag - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    return this.vehiculosFiltrados.slice(inicio, fin);
  }

  get totalPaginas(): number {
    return Math.ceil(this.totalItems / this.registrosPorPagina);
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.pag = pagina;
    }
  }

  formatearFecha(fecha?: any): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }
}