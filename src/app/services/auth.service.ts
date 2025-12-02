import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.model';
import { LoginModel } from '../models/login.model';
import { UsuarioValidadoModel } from '../models/usuariovalidado.model';
import { ConfiguracionRutas } from '../config/configuracion.rutas';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    urlBackend: string = ConfiguracionRutas.urlBackend;

    // BehaviorSubject para manejar el estado de sesión reactivamente
    datosUsuarioValidado = new BehaviorSubject<UsuarioValidadoModel>(new UsuarioValidadoModel());

    public sesionActiva$ = this.datosUsuarioValidado.asObservable();

    constructor(private http: HttpClient) {
        // Validar sesión al inicializar el servicio
        this.validacionDeSesion();
    }

    /**
     * Inicia sesión del usuario
     */
    login(credentials: LoginModel): Observable<UsuarioValidadoModel> {
        return this.http.post<UsuarioValidadoModel>(`${this.urlBackend}auth/login`, credentials)
            .pipe(
                tap(res => {
                    if (res.access_token) {
                        this.AlmacenarDatosUsuarioValidado(res);
                    }
                })
            );
    }

    /**
     * Registra un nuevo usuario
     */
    register(data: UsuarioModel): Observable<any> {
        console.log(data);
        
        return this.http.post(`${this.urlBackend}usuario/register`, data);
    }

    /**
     * Cierra la sesión del usuario
     */
    logout(): void {
        this.RemoverDatosUsuarioValidado();
    }

    /**
     * Almacena los datos del usuario validado en localStorage
     */
    AlmacenarDatosUsuarioValidado(datos: UsuarioValidadoModel): boolean {
        const datosLS = localStorage.getItem('sesion');
        if (datosLS != null) {
            localStorage.removeItem('sesion');
        }
        const datosString = JSON.stringify(datos);
        localStorage.setItem('sesion', datosString);
        this.ActualizarComportamientoUsuario(datos);
        return true;
    }

    /**
     * Obtiene los datos de sesión almacenados
     */
    ObtenerDatosUsuarioValidado(): UsuarioValidadoModel | null {
        const datosLS = localStorage.getItem('sesion');
        if (datosLS) {
            try {
                const datos = JSON.parse(datosLS);
                return datos;
            } catch (error) {
                console.error('Error al parsear datos de sesión:', error);
                return null;
            }
        }
        return null;
    }

    /**
     * Valida si existe una sesión activa
     * Retorna el objeto completo de sesión o null si no existe
     */
    validacionDeSesion(): UsuarioValidadoModel | null {
        const ls = localStorage.getItem('sesion');
        if (ls) {
            try {
                const objUsuario = JSON.parse(ls);
                if (objUsuario && objUsuario.access_token) {
                    this.ActualizarComportamientoUsuario(objUsuario);
                    return objUsuario;
                }
            } catch (error) {
                console.error('Error al validar sesión:', error);
                this.ActualizarComportamientoUsuario(new UsuarioValidadoModel());
                return null;
            }
        }
        this.ActualizarComportamientoUsuario(new UsuarioValidadoModel());
        return null;
    }

    /**
     * Actualiza el BehaviorSubject con los datos del usuario
     */
    ActualizarComportamientoUsuario(datos: UsuarioValidadoModel): void {
        this.datosUsuarioValidado.next(datos);
    }

    /**
     * Remueve los datos del usuario validado
     */
    RemoverDatosUsuarioValidado(): void {
        const datosSesion = localStorage.getItem('sesion');
        if (datosSesion) {
            localStorage.removeItem('sesion');
        }
        this.ActualizarComportamientoUsuario(new UsuarioValidadoModel());
    }

    /**
     * Obtiene el Observable de los datos de sesión
     */
    ObtenerDatosSesion(): Observable<UsuarioValidadoModel> {
        return this.datosUsuarioValidado.asObservable();
    }

    /**
     * Verifica si el usuario está autenticado
     */
    estaAutenticado(): boolean {
        const datos = this.ObtenerDatosUsuarioValidado();
        return datos !== null && !!datos.access_token;
    }

    /**
     * Obtiene el token de acceso
     */
    getToken(): string | null {
        const datos = this.ObtenerDatosUsuarioValidado();
        return datos?.access_token || null;
    }
}