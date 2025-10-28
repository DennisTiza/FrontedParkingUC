import { Routes } from '@angular/router';
import { EntradaPage } from './pages/entrada-page/entrada-page';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { SalidaPage } from './pages/salida-page/salida-page';

export const routes: Routes = [
    {
        path: 'entrada',
        component: EntradaPage
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'salida',
        component: SalidaPage
    },
    {
        path: '', redirectTo: '/login',
        pathMatch: 'full'
    }
];
