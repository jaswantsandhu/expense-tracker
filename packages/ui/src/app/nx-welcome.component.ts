import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'expense-tracker-nx-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `Hello World`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
