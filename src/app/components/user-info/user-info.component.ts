import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserDTO } from '../../dto/user.dto';

@Component({
  selector: 'app-user-info',
  imports: [MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  user: UserDTO | null = null;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (!this.user) {
      this.user = this.authService.getUser();
    }
  }

  updateUser(user: UserDTO) {
    this.user = user; // Atualiza o usuário
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
