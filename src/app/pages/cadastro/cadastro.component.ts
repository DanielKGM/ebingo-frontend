import { MainComponent } from './../../components/main/main.component';
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SectionTitleComponent } from '../../components/section-title/section-title.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActionButtonsComponent } from '../../components/action-buttons/action-buttons.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [
    SectionTitleComponent,
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
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CadastroComponent {}
