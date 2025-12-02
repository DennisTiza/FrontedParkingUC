import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReporteModel } from '../models/reporte.model';
import { ConfiguracionRutas } from '../config/configuracion.rutas';
import { DateUtilsService } from './date-utils.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  constructor(private http: HttpClient, private dateUtilsService: DateUtilsService) { }

  urlBackend: string = ConfiguracionRutas.urlBackend;

  generarReporteDiario(data: ReporteModel): Observable<any> {
    const sesion = JSON.parse(localStorage.getItem('sesion') || '{}');
    const token = sesion?.access_token || '';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const fecha = this.dateUtilsService.toYMD(data.fechaInicio!);
    return this.http.get(`${this.urlBackend}reporte?fecha=${fecha}`, { headers, responseType: 'blob' });
  }


  generarReporteSemanalXParqueadero(data: ReporteModel): Observable<any> {
    const sesion = JSON.parse(localStorage.getItem('sesion') || '{}');
    const token = sesion?.access_token || '';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const fechaInicio = this.dateUtilsService.toYMD(data.fechaInicio!);
    const fechaFin = this.dateUtilsService.toYMD(data.fechaFin!);

    return this.http.get(`${this.urlBackend}reporte/parqueadero/semana?inicio=${fechaInicio}&fin=${fechaFin}`,
      { headers, responseType: 'blob' });
  }


  generarReporteMensualXParqueadero(data: ReporteModel): Observable<any> {
    const sesion = JSON.parse(localStorage.getItem('sesion') || '{}');
    const token = sesion?.access_token || '';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const anio = this.dateUtilsService.getYear(data.fechaInicio!);
    const mes = this.dateUtilsService.getMonth(data.fechaFin!);

    return this.http.get(`${this.urlBackend}reporte/parqueadero/mes?anio=${anio}&mes=${mes}`,
      { headers, responseType: 'blob' });
  }


  generarReporteSemanalxTipo(data: ReporteModel): Observable<any> {
    const sesion = JSON.parse(localStorage.getItem('sesion') || '{}');
    const token = sesion?.access_token || '';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const fechaInicio = this.dateUtilsService.toYMD(data.fechaInicio!);
    const fechaFin = this.dateUtilsService.toYMD(data.fechaFin!);

    return this.http.get(`${this.urlBackend}reporte/vehiculo/semana?tipo=${data.tipoVehiculo}&inicio=${fechaInicio}&fin=${fechaFin}`,
      { headers, responseType: 'blob' });
  }


  generarReporteMensualxTipo(data: ReporteModel): Observable<any> {
    const sesion = JSON.parse(localStorage.getItem('sesion') || '{}');
    const token = sesion?.access_token || '';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const anio = this.dateUtilsService.getYear(data.fechaInicio!);
    const mes = this.dateUtilsService.getMonth(data.fechaFin!);

    return this.http.get(`${this.urlBackend}reporte/vehiculo/mes?tipo=${data.tipoVehiculo}&anio=${anio}&mes=${mes}`,
      { headers, responseType: 'blob' });
  }

  downloadBlob(blob: Blob, fileName: string = 'reporte.pdf'): void {
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

}
