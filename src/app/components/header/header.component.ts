import { Component, input, OnInit, signal } from '@angular/core';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [UserInfoComponent],
})
export class HeaderComponent implements OnInit {
  showSlogan = input.required<boolean>();
  ballSize = signal('80px');
  textSize = signal('3rem');
  showUserInfo = input(false);

  ngOnInit() {
    if (!this.showSlogan()) {
      this.ballSize.set('60px');
      this.textSize.set('2rem');
    }
  }
}
