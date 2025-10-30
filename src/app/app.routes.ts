import { Routes } from '@angular/router';
import { EntradaPage } from './pages/entrada-page/entrada-page';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { SalidaPage } from './pages/salida-page/salida-page';
import { ParqueaderoPage } from './pages/parqueadero-page/parqueadero-page';
import { ValidarSesionInactivaGuard } from './guard/validar-sesion-inactiva.guard';
import { ValidarSesionActivaGuard } from './guard/validar-sesion-activa.guard';

export const routes: Routes = [
    {
        path: 'entrada',
        component: EntradaPage,
        canActivate: [ValidarSesionActivaGuard]
    },
    {
        path: 'login',
        component: Login,
        canActivate: [ValidarSesionInactivaGuard]
    },
    {
        path: 'register',
        component: Register,
        canActivate: [ValidarSesionActivaGuard]
    },
    {
        path: 'salida',
        component: SalidaPage,
        canActivate: [ValidarSesionActivaGuard]
    },
    {
        path: '', redirectTo: '/login',
        pathMatch: 'full',
    },
    {
        path: 'parqueadero',
        component: ParqueaderoPage,
        canActivate: [ValidarSesionActivaGuard]
    }
];
