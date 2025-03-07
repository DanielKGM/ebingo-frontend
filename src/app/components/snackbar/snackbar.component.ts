import { Component, inject, Inject, signal } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-snackbar-message',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  imports: [MatIconModule, MatButtonModule],
})
export class SnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
  icon = signal('lightbulb'); // icone info padrão
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    if (data?.type === 'good') {
      this.icon.set('check');
    } else if (data?.type === 'bad') {
      this.icon.set('close');
    }
  }
}
