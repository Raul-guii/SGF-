import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // Login (rota pública)
  {
    path: 'login',
    component: LoginComponent
  },

  // Dashboard (rota protegida)
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard]
  },

  // Redirecionamento padrão
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Rota não encontrada
  {
    path: '**',
    redirectTo: 'login'
  }
];