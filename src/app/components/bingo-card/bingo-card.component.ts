import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bingo-card',
  imports: [],
  templateUrl: './bingo-card.component.html',
  styleUrl: './bingo-card.component.scss',
})
export class BingoCardComponent {
  bingoItems: number[] = Array.from({ length: 25 }, (_, i) => i);
  activeItems: boolean[] = new Array(25).fill(false);

  toggleItem(index: number): void {
    this.activeItems[index] = !this.activeItems[index];
  }

  clearSelection(): void {
    this.activeItems.fill(false);
  }
}
