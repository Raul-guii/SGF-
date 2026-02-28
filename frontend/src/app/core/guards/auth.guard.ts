import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {

  const isAuth = this.authService.isAuthenticated();

  console.log('AuthGuard executado');
  console.log('Token:', this.authService.getToken());
  console.log('isAuthenticated:', isAuth);

  if (isAuth) {
    return true;
  }

  console.log('REDIRECIONANDO PARA LOGIN');
  return this.router.createUrlTree(['/login']);
  }

  canActivateChild(): boolean | UrlTree {
    return this.authService.isAuthenticated()
      ? true
      : this.router.createUrlTree(['/login']);
  }

  private checkAuth(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}