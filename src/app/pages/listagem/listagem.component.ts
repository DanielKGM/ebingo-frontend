import { MainComponent } from './../../components/main/main.component';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HowToPlayComponent } from '../../components/how-to-play/how-to-play.component';

@Component({
  selector: 'app-listagem',
  imports: [
    HeaderComponent,
    MainComponent,
    FooterComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink,
    MatCardModule,
    PageTitleComponent,
    MatDialogModule,
  ],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListagemComponent {
  readonly dialog = inject(MatDialog);

  openTutorial() {
    const dialogRef = this.dialog.open(HowToPlayComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
