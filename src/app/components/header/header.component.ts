import { AuthService } from './../../services/auth.service';
import { Component, input, OnInit, signal } from '@angular/core';
import { UserInfoComponent } from '../user-info/user-info.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

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
  ],
})
export class HeaderComponent implements OnInit {
  showSlogan = input.required<boolean>();
  ballSize = signal('80px');
  textSize = signal('3rem');
  borderSize = signal('3px');
  showUserInfo = input(false);

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    if (!this.showSlogan()) {
      this.ballSize.set('60px');
      this.textSize.set('2rem');
      this.borderSize.set('2.5px');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
