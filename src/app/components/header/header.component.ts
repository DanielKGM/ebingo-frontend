import { AuthService } from './../../services/auth.service';
import { Component, input } from '@angular/core';
import { UserInfoComponent } from '../user-info/user-info.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    UserInfoComponent,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    LogoComponent,
  ],
})
export class HeaderComponent {
  showSlogan = input.required<boolean>();
  showUserInfo = input(false);

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
