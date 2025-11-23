import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  constructor() { }

  // Convierte Fri Nov 14 2025 19:00:00 -> 2025-11-15
  toYMD(date: Date): string {
    // Ajuste a fecha local (si la hora hace que cambie de día)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // Devuelve solo el año
  getYear(date: Date): number {
    return date.getFullYear();
  }

  // Devuelve solo el mes (01 a 12)
  getMonth(date: Date): string {
    return String(date.getMonth() + 1).padStart(2, '0');
  }

}

