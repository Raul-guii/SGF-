import { provideRouter, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { AuthGuard } from './auths/guards/auth.guard';
import { AccessDeniedPage } from './pages/access-denied/access-denied.page';
import { PaymentPage } from './pages/payment/payment.page';
import { PublicGuard } from './auths/guards/public.guard';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { UsersListComponent } from './admin/users/users-list/users-list.component';
import { UsersFormComponent } from './admin/users/users-form/users-form.component';
import { MainLayoutsComponent } from './layout/main-layouts/main-layouts.component';

const routes: Routes = [
    
  // públicas
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage, canActivate: [PublicGuard] },

  {
    path: '',
    component: MainLayoutsComponent,
    canActivate: [AuthGuard],
    children: [
  
  // protegida / qualquer usuário logado
  { path: 'payment', component: PaymentPage, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardPage, canActivate: [AuthGuard] },   

  // área ADMIN
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ADMIN' },
    children: [
      { 
        path: 'users',
        children: [
          { path: '', component: UsersListComponent },
          { path: 'new', component: UsersFormComponent },
          { path: ':id/edit', component: UsersFormComponent },
        ]
      }
    ]
  }
 ]
},

  // página de erro
  { path: 'access-denied', component: AccessDeniedPage },

  // fallback
  { path: '**', redirectTo: 'home' },
];

export const appRouterProviders = [provideRouter(routes)];
