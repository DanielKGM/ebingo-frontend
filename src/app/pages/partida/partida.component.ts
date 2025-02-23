import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuditComponent } from '../../components/audit/audit.component';
import { CustomContainerComponent } from '../../components/custom-container/custom-container.component';
import { BingoCardComponent } from '../../components/bingo-card/bingo-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgClass } from '@angular/common';

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
  partidaUuid = signal<string | null>(null);
  constructor(private readonly route: ActivatedRoute) {}
  selectedTab = signal<string>('card');

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.partidaUuid.set(params.get('uuid'));
    });
  }

  openAudit() {
    const dialogRef = this.dialog.open(AuditComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  setSelectedTab(tab: string) {
    this.selectedTab.set(tab);
    console.log(tab);
  }
}
