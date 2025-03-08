import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

type TipoMensagem = 'default' | 'bad' | 'good';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private readonly snackBar: MatSnackBar) {}

  showMessage(
    message: string,
    type: TipoMensagem = 'default',
    duration: number = 3000
  ): void {
    this.setSnackbarColor(type);
    let audio = new Audio(type + '.mp3');
    audio.load();
    audio.currentTime = 0;
    audio.play().then(() =>
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: { message, type },
        duration,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      })
    );
  }

  private setSnackbarColor(type: TipoMensagem): void {
    let color = '';

    if (type === 'good') color = '#388e3c';
    if (type === 'bad') color = '#d32f2f';

    document.documentElement.style.setProperty('--sbColor', color);
  }
}
