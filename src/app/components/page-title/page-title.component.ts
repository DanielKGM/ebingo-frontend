import { Component, input } from '@angular/core';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-title',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss',
})
export class PageTitleComponent {
  constructor(private readonly location: Location) {}
  title = input.required<string>();
  hasBackButton = input.required<boolean>();
  pb = input('4');

  goBack(): void {
    this.location.back();
  }
}
