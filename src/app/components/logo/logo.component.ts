import { Component, input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent implements OnInit {
  smaller = input.required<boolean>();
  ballSize = signal('80px');
  textSize = signal('2.5rem');
  borderSize = signal('4px');

  ngOnInit() {
    if (this.smaller()) {
      this.ballSize.set('60px');
      this.textSize.set('1.8rem');
      this.borderSize.set('3px');
    }
  }
}
