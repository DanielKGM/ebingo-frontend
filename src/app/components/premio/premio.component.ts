import { Component, Inject } from '@angular/core';
import { DialogTemplateComponent } from '../dialog-template/dialog-template.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-premio',
  imports: [DialogTemplateComponent, MatIconModule, MatTooltipModule],
  templateUrl: './premio.component.html',
  styleUrl: './premio.component.scss',
})
export class PremioComponent {
  prize: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { prize: string },
    private readonly clipboard: Clipboard
  ) {
    this.prize = data.prize;
  }
  copyToClipboard() {
    this.clipboard.copy(this.prize);
  }
}
