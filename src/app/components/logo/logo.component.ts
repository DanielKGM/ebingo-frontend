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
  textSize = signal('3rem');
  borderSize = signal('3px');

  ngOnInit() {
    if (this.smaller()) {
      this.ballSize.set('60px');
      this.textSize.set('2rem');
      this.borderSize.set('2.5px');
    }
  }
}
