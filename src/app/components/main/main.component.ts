import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-main',
  imports: [MatCardModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  hasContentTitle = input.required();
  hasTwoContents = input.required();
  divide = input(); // 'divide-x divide-gray-400'
}
