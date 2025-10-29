import { Component, OnInit } from '@angular/core';
import { parqueaderoService } from '../../services/parqueadero.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parqueadero-page',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './parqueadero-page.html',
  styleUrl: './parqueadero-page.css'
})
export class ParqueaderoPage implements OnInit {
  form!: FormGroup;
  parqueaderos: any[] = [];
  constructor(
    private parqueaderoService: parqueaderoService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      parqueadero: ['']
    });

    this.parqueaderoService.getParqueaderos().subscribe({
      next: (data) =>{
        this.parqueaderos = data as any[];
      },
      error: (error) => {
        console.error('Error cargando parqueaderos:', error);
      } 
    });
  }

  registrar(){
    const seleccionado = this.form.value.parqueadero;
    if (seleccionado) {
      this.parqueaderoService.setParqueadero(seleccionado);
      this.router.navigate(['/entrada']);
    }
  }
}
