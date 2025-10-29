import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UsuarioModel } from '../models/usuario.model';
import { LoginModel } from '../models/login.model';
import { UsuarioValidadoModel } from '../models/usuariovalidado.model';
import { ConfiguracionRutas } from '../config/configuracion.rutas';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    urlBackend: string = ConfiguracionRutas.urlBackend;


    private sesionActivaSubject = new BehaviorSubject<boolean>(this.verificarToken());

    public sesionActiva$ = this.sesionActivaSubject.asObservable();

    constructor(private http: HttpClient) { }

    private verificarToken(): boolean {
        const token = localStorage.getItem('token');
        return !!token;
    }


    login(credentials: LoginModel): Observable<UsuarioValidadoModel> {
        return this.http.post<UsuarioValidadoModel>(`${this.urlBackend}auth/login`, credentials)
            .pipe(
                tap(res => {
                    if (res.access_token) {
                        localStorage.setItem('sesion', JSON.stringify({
                            access_token: res.access_token,
                            nombre: res.user?.nombre || '',
                            id: res.user?.id || '',
                            rol: res.user?.rol || ''
                        }));
                        this.sesionActivaSubject.next(true);
                    }
                })
            );
    }


    register(data: UsuarioModel): Observable<any> {
        return this.http.post(`${this.urlBackend}usuario/register`, data);
    }


    logout(): void {
        localStorage.removeItem('sesion');
        this.sesionActivaSubject.next(false);
    }


    getToken(): string | null {
        return localStorage.getItem('token');
    }

    estaAutenticado(): boolean {
        return this.sesionActivaSubject.value;
    }

    verificarSesion(): void {
        const tieneToken = this.verificarToken();
        if (this.sesionActivaSubject.value !== tieneToken) {
            this.sesionActivaSubject.next(tieneToken);
        }
    }
}