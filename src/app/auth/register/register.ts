// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class Register {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  data = {}

  roles = [
    { value: 'VIGILANTE', label: 'Vigilante' },
    { value: 'ADMINISTRADOR', label: 'Administrador' },
    { value: 'SUPERUSUARIO', label: 'Superusuario' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      cedula: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(7), Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';  

    this.data = {
      "nombre": this.registerForm.value.nombre,
      "cedula": this.registerForm.value.cedula,
      "correo": this.registerForm.value.correo,
      "contraseña": this.registerForm.value.password,
      "rol": this.registerForm.value.rol
    }

    this.authService.register(this.data).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        alert('Usuario registrado correctamente');
        this.registerForm.reset();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Error al registrar el usuario';
      },
      complete: () => (this.isLoading = false)
    });
  }

  get nombre() { return this.registerForm.get('nombre'); }
  get cedula() { return this.registerForm.get('cedula'); }
  get correo() { return this.registerForm.get('correo'); }
  get rol() { return this.registerForm.get('rol'); }
  get password() { return this.registerForm.get('password'); }
}