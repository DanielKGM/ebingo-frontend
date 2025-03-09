import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

type TipoMensagem = 'default' | 'bad' | 'good';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly sfx: { [key in TipoMensagem]?: HTMLAudioElement } = {};

  constructor(private readonly snackBar: MatSnackBar) {
    this.preloadAudio();
  }

  private preloadAudio() {
    ['default', 'good', 'bad'].forEach((type) => {
      this.sfx[type as TipoMensagem] = new Audio(`${type}.mp3`);
    });
  }

  showMessage(
    message: string,
    type: TipoMensagem = 'default',
    duration: number = 3000
  ) {
    this.setSnackbarColor(type);

    const audio = this.sfx[type];
    if (audio) {
      audio.currentTime = 0;
      audio.play().then(() => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: { message, type },
          duration,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      });
    }
  }

  private setSnackbarColor(type: TipoMensagem): void {
    const colors: { [key in TipoMensagem]: string } = {
      default: '',
      good: '#388e3c',
      bad: '#d32f2f',
    };
    document.documentElement.style.setProperty('--sbColor', colors[type]);
  }
}
