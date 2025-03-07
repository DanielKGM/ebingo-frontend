import { UserDTO } from './../dto/user.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly authStatusSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private readonly http: HttpClient) {
    this.http = http;
  }

  register(user: UserDTO): Observable<void> {
    return this.http
      .post<UserDTO>(`${this.apiUrl}/register`, user)
      .pipe(
        switchMap(() =>
          this.login({ nickname: user.nickname, password: user.password }).pipe(
            map(() => void 0)
          )
        )
      );
  }

  login(credentials: {
    nickname: string;
    password?: string;
  }): Observable<{ token: string; user: UserDTO }> {
    return this.http
      .post<{ token: string; user: UserDTO }>(
        `${this.apiUrl}/login`,
        credentials
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.authStatusSubject.next(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authStatusSubject.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser(): UserDTO | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
