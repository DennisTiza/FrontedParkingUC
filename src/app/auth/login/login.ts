import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginModel } from '../../models/login.model'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class Login {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService  
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

onSubmit() {
  if (this.loginForm.invalid) {
    this.markFormGroupTouched();
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';

  const credentials: LoginModel = this.loginForm.value; 

  this.authService.login(credentials).subscribe({
    next: (res) => {
      console.log('Inicio de sesión exitoso:', res);
      this.router.navigate(['/entrada']);
    },
    error: (err) => {
      this.errorMessage =
        err?.error?.message || 'Credenciales incorrectas o error del servidor.';
      this.isLoading = false;
    },
    complete: () => {
      this.isLoading = false;
    }
  });
}

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
