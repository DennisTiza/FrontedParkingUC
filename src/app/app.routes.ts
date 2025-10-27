import { Routes } from '@angular/router';
import { EntradaPage } from './pages/entrada-page/entrada-page';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

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
    }
];
