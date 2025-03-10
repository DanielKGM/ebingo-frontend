import { Component, Inject } from '@angular/core';
import { DialogTemplateComponent } from '../dialog-template/dialog-template.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-premio',
  imports: [DialogTemplateComponent],
  templateUrl: './premio.component.html',
  styleUrl: './premio.component.scss',
})
export class PremioComponent {
  prize: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { prize: string }) {
    this.prize = data.prize;
  }
}
