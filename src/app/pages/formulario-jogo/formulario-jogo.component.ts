import { MainComponent } from './../../components/main/main.component';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActionButtonsComponent } from '../../components/action-buttons/action-buttons.component';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { Location } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PageTitleComponent } from '../../components/page-title/page-title.component';

@Component({
  selector: 'app-formulario-jogo',
  imports: [
    HeaderComponent,
    MainComponent,
    FooterComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ActionButtonsComponent,
    MatSelectModule,
    RouterLink,
    MatDatepickerModule,
    MatCardModule,
    MatTimepickerModule,
    MatSlideToggleModule,
    MatTooltipModule,
    PageTitleComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './formulario-jogo.component.html',
  styleUrl: './formulario-jogo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioJogoComponent {
  constructor(private readonly location: Location) {}

  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();

    return day !== 0 && day !== 6;
  };

  goBack(): void {
    this.location.back();
  }
}
