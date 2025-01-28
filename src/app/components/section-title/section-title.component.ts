import { Component, input } from '@angular/core';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-section-title',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './section-title.component.html',
  styleUrl: './section-title.component.scss',
})
export class SectionTitleComponent {
  title = input.required<string>();
  goBackButton = input.required<boolean>();
  constructor(private readonly location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
