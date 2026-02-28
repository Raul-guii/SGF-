import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['role'];
  const userRole = authService.getUserRole();

  if (userRole === expectedRole) {
    return true;
  }

  router.navigate(['/access-denied']);
  return false;
};