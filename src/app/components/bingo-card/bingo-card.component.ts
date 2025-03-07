import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bingo-card',
  imports: [],
  templateUrl: './bingo-card.component.html',
  styleUrl: './bingo-card.component.scss',
})
export class BingoCardComponent {
  @Input() bingoItems: number[] = [];
  @Input() markedNumbers: number[] = [];
  @Output() markNumber = new EventEmitter<number>();

  isMarked(num: number): boolean {
    return this.markedNumbers.includes(num);
  }

  toggleItem(num: number): void {
    if (!this.isMarked(num)) {
      this.markNumber.emit(num);
    }
  }
}
