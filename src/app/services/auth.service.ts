import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    access_token: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

interface User {
  id: number;
  name: string;
  cedula: string;
  role: string;
  email: string;
  password: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient) { }

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials);
    }

    register(data:User): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario/register`, data);
  }
}
