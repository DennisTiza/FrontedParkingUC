import { Component, signal, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrada-page',
  imports: [],
  templateUrl: './entrada-page.html',
  styleUrl: './entrada-page.css'
})
export class EntradaPage {
  hora = signal('');

  ngOnInit():void {
    const fecha = new Date();
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    this.hora.set(`${horas}:${minutos}`);
  }
}
