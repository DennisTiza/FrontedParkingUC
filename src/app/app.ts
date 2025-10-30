import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/shared/navbar/navbar';
import { ReactiveFormsModule } from '@angular/forms';
import { Disponibilidad } from './components/shared/disponibilidad/disponibilidad';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ReactiveFormsModule, Disponibilidad],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontendParkingUC');
}
