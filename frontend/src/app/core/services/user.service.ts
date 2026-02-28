import { HttpClient } from "@angular/common/http";
import { environment } from "../../../enviroments/enviroment";
import { ChangePasswordRequest, UpdateUserRequest, User } from "../models/user.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private readonly ADMIN_API = `${environment.apiUrl}/admin`;
  private readonly USER_API = `${environment.apiUrl}/me`;

  constructor(private http: HttpClient) {}

  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.ADMIN_API);
  }

  createUser(data: any): Observable<any> {
    return this.http.post(`${this.ADMIN_API}/users`, data);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ADMIN_API}/users/${id}`);
  }

  updateUser(id: number, data: UpdateUserRequest): Observable<User> {
    return this.http.put<User>(`${this.ADMIN_API}/users/${id}`, data);
  }

  changePassword(data: ChangePasswordRequest): Observable<void> {
    return this.http.put<void>(`${this.USER_API}/password`, data);
  }
}