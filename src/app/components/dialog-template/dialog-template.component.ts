import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-template',
  imports: [MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-template.component.html',
  styleUrl: './dialog-template.component.scss',
})
export class DialogTemplateComponent {
  title = input<string | null>(null);
}
