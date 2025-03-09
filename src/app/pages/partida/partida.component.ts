import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuditComponent } from '../../components/audit/audit.component';
import { CustomContainerComponent } from '../../components/custom-container/custom-container.component';
import { BingoCardComponent } from '../../components/bingo-card/bingo-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgClass } from '@angular/common';
import { GameDto } from '../../dto/game.dto';
import { CardDto } from '../../dto/card.dto';
import { GameService } from '../../services/game.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-partida',
  imports: [
    HeaderComponent,
    MatIconModule,
    RouterLink,
    MatDialogModule,
    CustomContainerComponent,
    BingoCardComponent,
    MatButtonModule,
    MatButtonToggleModule,
    NgClass,
  ],
  templateUrl: './partida.component.html',
  styleUrl: './partida.component.scss',
})
export class PartidaComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  selectedTab = signal<string>('card');
  userId!: string;
  game: GameDto | null;
  gameId!: string;
  card!: CardDto | null;
  drawnNumbers: number[] = [];
  markAudio: HTMLAudioElement = new Audio('pentip.mp3');

  constructor(
    private readonly route: ActivatedRoute,
    private readonly gameService: GameService,
    private readonly snackbarService: SnackbarService,
    private readonly router: Router
  ) {
    this.game = this.route.snapshot.data['game'];
  }

  ngOnInit(): void {
    const user = this.route.snapshot.data['user'];

    if (!this.game || !user) {
      this.router.navigate(['/jogos']);
    } else {
      this.userId = user.id!;
      this.gameId = this.game.id!;
      this.drawnNumbers = this.game.drawnNumbers!;
      this.loadCard();
    }
  }

  loadCard(): void {
    this.gameService.getUserCard(this.gameId, this.userId).subscribe({
      next: (card) => {
        this.card = card;
      },
      error: (error) => {
        this.snackbarService.showMessage(
          error?.error?.message || 'Erro ao carregar cartela!'
        );
      },
    });
  }

  joinGame(): void {
    this.gameService.joinGame(this.gameId, this.userId).subscribe({
      next: (card) => {
        this.card = card;
        this.snackbarService.showMessage('Cartela gerada com sucesso!', 'good');
      },
      error: (error) => {
        this.snackbarService.showMessage(
          error?.error?.message || 'Erro ao entrar no jogo!',
          'bad'
        );
      },
    });
  }

  markNumber(number: number): void {
    if (!this.card) return;
    if (!this.game) return;

    if (
      this.game.drawnNumbers?.find((element) => element == number) == undefined
    ) {
      this.snackbarService.showMessage(`O número ${number} não foi sorteado!`);
      return;
    }

    if (this.game.winner) {
      this.snackbarService.showMessage(`O jogo já tem um vencedor.`);
      return;
    }

    this.gameService.markNumber(this.gameId, this.userId, number).subscribe({
      next: (updatedMarkedNumbers) => {
        if (this.card) {
          this.card.markedNumbers = updatedMarkedNumbers;
          this.markAudio.play();
        }
      },
      error: (error) => {
        this.snackbarService.showMessage(
          error?.error?.message || 'Erro desconhecido'
        );
      },
    });
  }

  get formattedDate(): string {
    const date =
      this.game?.status === 'NAO_INICIADO' || this.game?.status === 'INICIADO'
        ? this.game?.startTime
        : this.game?.endTime;

    return date ? new Date(date).toLocaleString('pt-BR') : 'Sem data';
  }

  drawNewNumber(): void {
    if (this.game?.winner) {
      this.snackbarService.showMessage('O jogo já tem um vencedor!', 'bad');
      return;
    }
    this.gameService.drawNumber(this.gameId).subscribe({
      next: (updatedGame) => {
        this.game = updatedGame;
        this.drawnNumbers = updatedGame.drawnNumbers || [];
      },
      error: (error) => {
        this.snackbarService.showMessage(
          error?.error?.message || 'Erro ao sortear número!',
          'bad'
        );
      },
    });
  }

  openAudit() {
    this.dialog.open(AuditComponent);
  }

  setSelectedTab(tab: string) {
    this.selectedTab.set(tab);
  }
}
