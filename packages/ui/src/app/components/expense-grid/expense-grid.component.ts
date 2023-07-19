import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'expense-tracker-expense-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-grid.component.html',
  styleUrls: ['./expense-grid.component.scss'],
})
export class ExpenseGridComponent {}
