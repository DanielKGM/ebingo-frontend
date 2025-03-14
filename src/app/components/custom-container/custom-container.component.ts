import { NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-custom-container',
  templateUrl: './custom-container.component.html',
  styleUrl: './custom-container.component.scss',
  imports: [NgStyle],
})
export class CustomContainerComponent {
  _title = input<string | null>();
  titleAlign = input('start');
  classes = input('');
}
