import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { UserFormComponent } from './features/admin/user-form/user-form';
import { UserEditComponent } from './features/admin/user-edit/user-edit';
import { AuthGuard } from './core/guards/auth.guard';
import { UserList } from './features/admin/user-list/user-list';
import { UsersResolver } from './core/services/user-resolver.service';

export const routes: Routes = [

  // Login (rota pública)
  {
    path: 'login',
    component: LoginComponent
  },

  // Dashboard (protegido)
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],

    children: [

      {
        path: 'user-list',
        component: UserList,
        resolve: {
          users: UsersResolver
        }
      },

      {
        path: 'user-form',
        component: UserFormComponent
      },

      {
        path: 'user-edit/:id',
        component: UserEditComponent
      }

    ]
  },

  {
    path: 'access-denied',
    loadComponent: () =>
      import('./features/access-denied/access-denied')
        .then(m => m.AccessDenied)
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