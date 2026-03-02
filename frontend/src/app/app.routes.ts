import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { UserFormComponent } from './features/admin/user-form/user-form';
import { UserEditComponent } from './features/admin/user-edit/user-edit';
import { AuthGuard } from './core/guards/auth.guard';
import { UserList } from './features/admin/user-list/user-list';
import { UsersResolver } from './core/services/user-resolver.service';
import { ContractUpdate } from './features/contracts/contract-update/contract-update';
import { roleGuard } from './core/guards/role.guard';
import { ContractForm } from './features/contracts/contract-form/contract-form';
import { ContractList } from './features/contracts/contract-list/contract-list';
import { ContractDetail } from './features/contracts/contract-detail/contract-detail';
import { ContractsResolver } from './core/services/contract-resolver';

export const routes: Routes = [

  // Login (rota pública)
  {
    path: 'login',
    component: LoginComponent
  },

  // Dashboard (ADMIN)
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

      //USERS
      {
        path: 'user-list',
        component: UserList,
        resolve: {users: UsersResolver}
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
    path: 'contracts',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ContractList,
        resolve: { contracts: ContractsResolver }
      },
      {
        path: 'new',
        component: ContractForm
      },
      {
        path: 'edit/:id',
        component: ContractUpdate
      },  {
    path: 'contracts',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ContractList,
        resolve: { contracts: ContractsResolver }
      },
      {
        path: 'new',
        component: ContractForm
      },
      {
        path: 'edit/:id',
        component: ContractUpdate
      },
      {
        path: ':id',
        component: ContractDetail
      }
    ]
  },
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