import { MainComponent } from './../../components/main/main.component';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActionButtonsComponent } from '../../components/action-buttons/action-buttons.component';
import { RouterLink } from '@angular/router';
import { PageTitleComponent } from '../../components/page-title/page-title.component';

@Component({
  selector: 'app-perfil',
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
    RouterLink,
    MatCardModule,
    PageTitleComponent,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerfilComponent {}
