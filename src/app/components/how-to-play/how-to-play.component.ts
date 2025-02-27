import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogTemplateComponent } from '../dialog-template/dialog-template.component';

@Component({
  selector: 'app-how-to-play',
  imports: [DialogTemplateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './how-to-play.component.html',
  styleUrl: './how-to-play.component.scss',
})
export class HowToPlayComponent {}
