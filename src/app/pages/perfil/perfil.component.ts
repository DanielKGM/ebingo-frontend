import { MainComponent } from './../../components/main/main.component';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActionButtonsComponent } from '../../components/action-buttons/action-buttons.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { UserDTO } from '../../dto/user.dto';

@Component({
  selector: 'app-perfil',
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
    MatCardModule,
    PageTitleComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerfilComponent {
  perfilForm: FormGroup;
  user: UserDTO | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly usuarioService: UserService,
    private readonly route: ActivatedRoute,
    private readonly snackbarService: SnackbarService,
    private readonly router: Router
  ) {
    this.user = this.route.snapshot.data['user'];
    this.perfilForm = this.fb.group({
      nickname: ['', Validators.required],
      email: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    if (!this.user) {
      this.router.navigate(['']);
    } else {
      this.perfilForm.patchValue({
        nickname: this.user.nickname,
        email: this.user.email,
      });
    }
  }

  updateNickname() {
    if (this.perfilForm.invalid) {
      this.snackbarService.showMessage(
        'O apelido não pode estar vazio!',
        'bad'
      );
      return;
    }

    const nickname = this.perfilForm.value.nickname;

    this.usuarioService.updateNickname(nickname).subscribe({
      next: (response) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        this.user = response.user;
        this.snackbarService.showMessage(
          'Apelido atualizado com sucesso!',
          'good'
        );
      },
      error: () => {
        this.snackbarService.showMessage('Erro ao atualizar o apelido.', 'bad');
      },
    });
  }

  deleteUser() {
    this.usuarioService.deleteUser().subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.snackbarService.showMessage('Conta excluída com sucesso.', 'good');
        this.router.navigate(['/']);
      },
      error: () => {
        this.snackbarService.showMessage('Erro ao excluir conta.', 'bad');
      },
    });
  }
}
