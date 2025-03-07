import { MainComponent } from './../../components/main/main.component';
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActionButtonsComponent } from '../../components/action-buttons/action-buttons.component';
import { Router, RouterLink } from '@angular/router';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    HeaderComponent,
    MainComponent,
    FooterComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ActionButtonsComponent,
    RouterLink,
    PageTitleComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  hide = signal(true);
  loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService
  ) {
    this.loginForm = this.fb.group({
      nickname: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  clickEvent(event: MouseEvent) {
    event.stopPropagation();
    this.hide.set(!this.hide());
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.snackbarService.showMessage(
        'Preencha todos os campos corretamente!',
        'bad'
      );
      return;
    }

    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe({
      next: () => {
        this.snackbarService.showMessage('Autenticado com sucesso!', 'good');
        this.router.navigate(['/jogos']);
      },
      error: () => {
        this.snackbarService.showMessage(
          'Credenciais inválidas. Tente novamente.',
          'bad'
        );
      },
    });
  }
}
