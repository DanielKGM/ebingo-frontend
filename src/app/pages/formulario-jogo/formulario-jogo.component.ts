import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionButtonsComponent } from '../../components/action-buttons/action-buttons.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { GameDto } from '../../dto/game.dto';
import { SnackbarService } from '../../services/snackbar.service';
import { MainComponent } from './../../components/main/main.component';
import { GameService } from './../../services/game.service';

@Component({
  selector: 'app-formulario-jogo',
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
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    MatTimepickerModule,
    MatSlideToggleModule,
    MatTooltipModule,
    PageTitleComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './formulario-jogo.component.html',
  styleUrl: './formulario-jogo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioJogoComponent implements OnInit {
  gameId: string | null = null;
  gameForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    private readonly location: Location,
    private readonly gameService: GameService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly snackbarService: SnackbarService
  ) {
    this.gameForm = this.fb.group({
      roomName: ['', Validators.required],
      startTime: ['', Validators.required],
      prize: [''],
      cardSize: ['', Validators.required],
      manualFill: [false],
    });
  }

  ngOnInit(): void {
    let game = this.route.snapshot.data['game'];

    if (game?.id) {
      this.gameId = game.id;
      this.isEditing = true;
      this.loadGameDetails(game);
    }
  }

  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  goBack(): void {
    this.location.back();
  }

  // Preenche os campos do formulário com os dados do jogo
  loadGameDetails(game: GameDto): void {
    if (game) {
      this.gameForm.setValue({
        roomName: game.roomName,
        startTime: game.startTime,
        prize: game.prize,
        cardSize: game.cardSize,
        manualFill: game.manualFill,
      });
    }
  }

  private convertDate(date: Date | null): Date {
    if (!date) return new Date();
    const parsedDate = date instanceof Date ? date : new Date(date);
    return new Date(
      parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000
    );
  }

  submitForm(): void {
    if (this.gameForm.invalid) {
      this.snackbarService.showMessage(
        'Preencha todos os campos corretamente!',
        'bad'
      );
      return;
    }

    const gameData: GameDto = {
      roomName: this.gameForm.value.roomName,
      startTime: this.convertDate(this.gameForm.value.startTime),
      prize: this.gameForm.value.prize,
      cardSize: this.gameForm.value.cardSize,
      manualFill: this.gameForm.value.manualFill,
      status: 'NAO_INICIADO',
    };

    if (this.isEditing && this.gameId) {
      // Se for edição, chama o serviço de atualização
      this.gameService.updateGame(this.gameId, gameData).subscribe({
        next: () => {
          this.snackbarService.showMessage(
            'Jogo atualizado com sucesso!',
            'good'
          );
          this.goBack();
        },
        error: (error) => {
          this.snackbarService.showMessage(
            error?.error?.message || 'Erro ao atualizar jogo!',
            'bad'
          );
        },
      });
    } else {
      // Se for criação, chama o serviço de criação
      this.gameService.createGame(gameData).subscribe({
        next: (newGame) => {
          this.snackbarService.showMessage('Jogo criado com sucesso!', 'good');
          this.router.navigate(['/jogos/' + newGame.id]);
        },
        error: (error) => {
          this.snackbarService.showMessage(
            error?.error?.message || 'Erro ao criar jogo!',
            'bad'
          );
        },
      });
    }
  }
}
