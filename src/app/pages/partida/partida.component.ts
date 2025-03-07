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
  game!: GameDto;
  gameId!: string;
  card!: CardDto | null;
  drawnNumbers: number[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly gameService: GameService,
    private readonly snackbarService: SnackbarService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('uuid')!;
    const user = localStorage.getItem('user');
    this.userId = user ? JSON.parse(user).id : null;
    this.loadGame();
  }

  loadGame(): void {
    this.gameService.getGameById(this.gameId).subscribe({
      next: (game) => {
        if (game) {
          this.game = game;
          this.drawnNumbers = game.drawnNumbers || [];
          this.loadCard(); // Somente carrega a cartela se o jogo for válido
        }
      },
      error: () => {
        this.snackbarService.showMessage('Erro ao carregar jogo!', 'bad');
        this.router.navigate(['/jogos']);
      },
    });
  }

  loadCard(): void {
    this.gameService.getUserCard(this.gameId, this.userId).subscribe({
      next: (card) => {
        this.card = card; // Carrega a cartela
      },
      error: (error) => {
        this.snackbarService.showMessage(
          error?.error?.message || 'Erro ao gerar cartela'
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

    this.gameService.markNumber(this.gameId, this.userId, number).subscribe({
      next: (updatedMarkedNumbers) => {
        this.card!.markedNumbers = updatedMarkedNumbers;
      },
      error: (error) => {
        this.snackbarService.showMessage(
          error?.error?.message || 'Erro desconhecido',
          'bad'
        );
      },
    });
  }

  drawNewNumber(): void {
    this.gameService.drawNumber(this.gameId).subscribe({
      next: (updatedGame) => {
        this.game = updatedGame;
        this.drawnNumbers = updatedGame.drawnNumbers || [];
      },
      error: () => {
        this.snackbarService.showMessage('Erro ao sortear número!', 'bad');
      },
    });
  }

  openAudit() {
    const dialogRef = this.dialog.open(AuditComponent);

    dialogRef.afterClosed().subscribe((result) => {
      //
    });
  }

  setSelectedTab(tab: string) {
    this.selectedTab.set(tab);
  }
}
