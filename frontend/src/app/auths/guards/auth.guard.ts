import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

  if (!this.authService.isTokenValid()) {
    this.authService.logout(); 
    this.router.navigate(['/login']);
    return false;
  }

  const expectedRole = route.data['role'] || route.parent?.data['role'];
  const userRole = this.authService.getRole();

  if (expectedRole && userRole !== expectedRole) {
    this.router.navigate(['/access-denied']);
    return false;
  }

  return true;
}

}
