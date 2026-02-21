import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login, Register } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';
  private readonly TOKEN_KEY = 'token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // LOGIN
  login(credentials: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  // REGISTER
  register(user: Register): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  // SALVAR TOKEN
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // PEGAR TOKEN
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // VERIFICAR SE ESTÁ LOGADO
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  // PEGAR ROLE DO TOKEN
  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch (error) {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;

    return Date.now() < exp;
  }

  hasRole(role: string): boolean {
    if (!this.isTokenValid()) return false;

    return this.getRole() === role;
  }


}
