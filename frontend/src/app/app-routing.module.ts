import { provideRouter, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';

const routes: Routes = [
    
// rotas publicas
{ path: 'home', component: HomePage },
{ path: 'login', component: LoginPage },
{ path: 'register', component: RegisterPage },

// rotas protegidas
//
//

//fallback
{ path: '**', redirectTo: 'home' }
];

export const appRouterProviders = [provideRouter(routes)];
