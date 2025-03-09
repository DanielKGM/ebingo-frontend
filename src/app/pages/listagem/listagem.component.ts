import { GameService } from './../../services/game.service';
import { MainComponent } from './../../components/main/main.component';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HowToPlayComponent } from '../../components/how-to-play/how-to-play.component';
import { ActionButtonsComponent } from '../../components/action-buttons/action-buttons.component';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { GameCardDto, GameFilterDto } from '../../dto/game.dto';
import { SnackbarService } from '../../services/snackbar.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-listagem',
  imports: [
    HeaderComponent,
    MainComponent,
    FooterComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink,
    MatCardModule,
    PageTitleComponent,
    MatDialogModule,
    ActionButtonsComponent,
    GameCardComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListagemComponent {
  games: GameCardDto[] = [];
  readonly dialog = inject(MatDialog);
  filterForm: FormGroup;

  constructor(
    private readonly gameService: GameService,
    private readonly snackbarService: SnackbarService,
    private readonly cdr: ChangeDetectorRef,
    private readonly fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      roomName: [''],
      status: [''],
    });

    this.filterForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.submitFilter());

    this.loadGamesByFilter({ roomName: null, status: null });
  }

  loadGamesByFilter(filter: GameFilterDto): void {
    this.gameService.getGames(filter).subscribe({
      next: (games) => {
        this.games = games;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.snackbarService.showMessage(
          error?.error?.message || 'Erro ao carregar jogos!'
        );
      },
    });
  }

  submitFilter() {
    if (this.filterForm.invalid) {
      return;
    }

    const filter: GameFilterDto = {
      roomName: this.filterForm.value.roomName,
      status: this.filterForm.value.status,
    };

    this.loadGamesByFilter(filter);
  }

  openTutorial() {
    this.dialog.open(HowToPlayComponent);
  }
}
