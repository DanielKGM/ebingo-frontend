import { Component, Input } from '@angular/core';
import { GameCardDto } from '../../dto/game.dto';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  imports: [RouterLink, NgStyle],
})
export class GameCardComponent {
  @Input() game!: GameCardDto;

  get statusColor(): string {
    switch (this.game?.status) {
      case 'NAO_INICIADO':
        return 'orange';
      case 'INICIADO':
        return 'green';
      case 'ENCERRADO':
      case 'CANCELADO':
        return 'red';
      default:
        return 'gray';
    }
  }

  get formattedDate(): string {
    const date =
      this.game?.status === 'NAO_INICIADO' || this.game?.status === 'INICIADO'
        ? this.game?.startTime
        : this.game?.endTime;

    return date ? new Date(date).toLocaleString('pt-BR') : 'Sem data';
  }
}
