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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ActionButtonsComponent } from '../../components/action-buttons/action-buttons.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { GameDto } from '../../dto/game.dto';
import { MainComponent } from './../../components/main/main.component';
import { GameService } from './../../services/game.service';
import { SnackbarService } from '../../services/snackbar.service';

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
    RouterLink,
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
      cardSize: [null, Validators.required],
      manualFill: [false],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.gameId = params.get('gameId');

      if (this.gameId) {
        this.isEditing = true;
        this.loadGameDetails();
      }
    });
  }

  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();

    return day !== 0 && day !== 6;
  };

  goBack(): void {
    this.location.back();
  }

  // Preenche os campos do formulário com os dados do jogo
  loadGameDetails(): void {
    if (this.gameId) {
      this.gameService.getGameById(this.gameId).subscribe({
        next: (game) => {
          this.gameForm.setValue({
            roomName: game.roomName,
            startTime: game.startTime,
            prize: game.prize,
            cardSize: game.cardSize,
            manualFill: game.manualFill,
          });
        },
        error: () => {
          this.snackbarService.showMessage('Erro ao carregar jogo!', 'bad');
          this.goBack();
        },
      });
    }
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
      startTime: this.gameForm.value.startTime,
      prize: this.gameForm.value.prize,
      cardSize: this.gameForm.value.cardSize,
      manualFill: this.gameForm.value.manualFill,
      status: 'NAO_INICIADO',
    };

    if (this.isEditing && this.gameId) {
      // Se for edição, chama o serviço de atualização
      this.gameService.updateGame(this.gameId, gameData).subscribe({
        next: (updatedGame) => {
          this.snackbarService.showMessage(
            'Jogo atualizado com sucesso!',
            'good'
          );
        },
        error: () => {
          this.snackbarService.showMessage('Erro ao atualizar jogo!', 'bad');
        },
      });
    } else {
      // Se for criação, chama o serviço de criação
      this.gameService.createGame(gameData).subscribe({
        next: (newGame) => {
          this.snackbarService.showMessage('Jogo criado com sucesso!', 'good');
          this.router.navigate(['/jogos']);
        },
        error: () => {
          this.snackbarService.showMessage('Erro ao criar jogo!', 'bad');
        },
      });
    }
  }
}
