import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePassword, UpdateUser, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private apiUrl = 'http://localhost:8080/me';

  constructor(private http: HttpClient){}

  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateUser(data: UpdateUser): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/me`, data);
  }

  changePassword(data: ChangePassword): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/password`, data);
  }
}
