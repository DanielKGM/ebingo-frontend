import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatCardModule, NgClass],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  hasTitleContent = input(false);
  hasTwoContents = input(false);
  hasFooterContent = input(false);
}
