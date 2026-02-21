@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'http://localhost:8080/me';

  constructor(private http: HttpClient){}

  getProfile(): Observable<User> {
    return this.http.get<User>(this.apiUrl);
  }

  updateProfile(data: UpdateUser): Observable<User> {
    return this.http.put<User>(this.apiUrl, data);
  }

  changePassword(data: ChangePassword): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/password`, data);
  }
}
