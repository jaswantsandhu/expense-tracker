import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseGridComponent } from '../../components/expense-grid/expense-grid.component';
import { Expense } from '../../interfaces/expense';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'expense-tracker-dashboard',
  standalone: true,
  imports: [CommonModule, ExpenseGridComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  _expenseService = inject(ExpenseService);

  settleExpense(expenses: Expense[]) {
    this._expenseService.settleExpenses(expenses);
  }
}
