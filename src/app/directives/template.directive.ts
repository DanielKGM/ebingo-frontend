import { Directive } from '@angular/core';

@Directive({
  selector: '[appTemplate]',
  standalone: true,
})
export class TemplateDirective {
  constructor() {}
}
