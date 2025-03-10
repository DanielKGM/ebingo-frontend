import { DialogTemplateComponent } from '../dialog-template/dialog-template.component';
import { GameAuditDto } from '../../dto/game.dto';
import { GameService } from '../../services/game.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-how-to-play',
  imports: [DialogTemplateComponent],
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.scss',
})
export class AuditComponent {
  audits: GameAuditDto[] | null = null;
  constructor(
    private readonly gameService: GameService,
    @Inject(MAT_DIALOG_DATA) public data: { gameId: string }
  ) {
    gameService.getAudits(data.gameId).subscribe({
      next: (value) => {
        this.audits = value;
      },
    });
  }
}
