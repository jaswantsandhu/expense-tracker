import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseGridComponent } from '../../components/expense-grid/expense-grid.component';

@Component({
  selector: 'expense-tracker-dashboard',
  standalone: true,
  imports: [CommonModule, ExpenseGridComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {}
