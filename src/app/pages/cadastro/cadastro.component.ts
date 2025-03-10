import { MainComponent } from './../../components/main/main.component';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActionButtonsComponent } from '../../components/action-buttons/action-buttons.component';
import { Router } from '@angular/router';
import { PageTitleComponent } from '../../components/page-title/page-title.component';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-cadastro',
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
    PageTitleComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly snackbarService: SnackbarService,
    private readonly router: Router
  ) {
    this.cadastroForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      this.showFormErrors();
      return;
    }

    const { nickname, email, password, confirmPassword } =
      this.cadastroForm.value;

    if (password !== confirmPassword) {
      this.snackbarService.showMessage('As senhas não coincidem!', 'bad');
      return;
    }

    const userDTO = { nickname, email, password };

    this.createUser(userDTO);
  }

  private showFormErrors(): void {
    const formControls = this.cadastroForm.controls;

    for (const key in formControls) {
      const control = this.cadastroForm.get(key);

      if (control?.invalid) {
        if (control?.hasError('required')) {
          this.snackbarService.showMessage(
            `Preencha os campos obrigatórios!`,
            'bad'
          );
        } else if (control?.hasError('email')) {
          this.snackbarService.showMessage('E-mail inválido!', 'bad');
        } else if (control?.hasError('minlength')) {
          this.snackbarService.showMessage(
            `A senha deve ter no mínimo 6 caracteres!`,
            'bad'
          );
        }
        return;
      }
    }
  }

  private createUser(userDTO: any): void {
    this.authService.register(userDTO).subscribe({
      next: (response) => {
        this.snackbarService.showMessage(
          'Cadastro realizado com sucesso!',
          'good'
        );
        this.router.navigate(['/jogos']);
      },
      error: (error) => {
        this.snackbarService.showMessage(
          'Erro ao criar o usuário. Tente novamente.',
          'bad'
        );
      },
    });
  }
}
