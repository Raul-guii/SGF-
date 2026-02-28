import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly API_URL = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, credentials);
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/register`, user);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  private decodeToken(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
      return JSON.parse(atob(padded));
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }

  getUserRole(): string | null {
    const payload = this.decodeToken();
    return payload?.role || null;
  }

  getUserRoleClean(): string | null {
    const role = this.getUserRole();
    return role?.replace('ROLE_', '') || null;
  }

  getUserEmail(): string | null {
    const payload = this.decodeToken();
    return payload?.sub || null; 
  }

  isTokenValid(): boolean {
    const payload = this.decodeToken();
    if (!payload) return false;

    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  isAuthenticated(): boolean {
    return this.isTokenValid();
  }

  hasRole(role: string): boolean {
    if (!this.isTokenValid()) return false;
    return this.getUserRole() === role;
  }
}