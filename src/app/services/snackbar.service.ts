import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private readonly snackBar: MatSnackBar) {}

  showMessage(
    message: string,
    type: 'default' | 'bad' | 'good' = 'default',
    action: string = 'OK',
    duration: number = 3000
  ): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message, type },
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
