import { Routes } from '@angular/router';
import { EntradaPage } from './pages/entrada-page/entrada-page';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { SalidaPage } from './pages/salida-page/salida-page';
import { ParqueaderoPage } from './pages/parqueadero-page/parqueadero-page';
import { ValidarSesionInactivaGuard } from './guard/validar-sesion-inactiva.guard';
import { ValidarSesionActivaGuard } from './guard/validar-sesion-activa.guard';
import { VehiculoPage } from './pages/vehiculo-page/vehiculo-page';
import { GestionVehiculoPage } from './pages/gestion-vehiculo-page/gestion-vehiculo-page';
import { EditarVehiculoPage } from './pages/editar-vehiculo-page/editar-vehiculo-page';

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
    },
    {
        path: 'vehiculo',
        component: VehiculoPage,
        canActivate: [ValidarSesionActivaGuard]
    },
    {
        path: 'gestion-vehiculo',
        component: GestionVehiculoPage,
        canActivate: [ValidarSesionActivaGuard]
    },
    {
        path: 'vehiculo/:placa',
        component: EditarVehiculoPage,
        canActivate: [ValidarSesionActivaGuard]
    }
];
