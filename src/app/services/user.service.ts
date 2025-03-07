import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserDTO } from '../dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/users`;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  getUser(): UserDTO | null {
    return this.authService.getUser();
  }

  updateNickname(
    nickname: string
  ): Observable<{ token: string; user: UserDTO }> {
    console.log(`${this.apiUrl}/update`);
    const user = this.getUser();
    if (!user) throw new Error('Usuário não encontrado no localStorage');

    return this.http.put<{ token: string; user: UserDTO }>(
      `${this.apiUrl}/update`,
      {
        ...user,
        nickname,
      }
    );
  }

  deleteUser(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete`);
  }
}
