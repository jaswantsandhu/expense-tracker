import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseGridComponent } from '../../components/expense-grid/expense-grid.component';
import { Expense } from '../../interfaces/expense';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseFormComponent } from '../../components/expense-form/expense-form.component';

@Component({
  selector: 'expense-tracker-dashboard',
  standalone: true,
  imports: [CommonModule, ExpenseGridComponent, ExpenseFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  _expenseService = inject(ExpenseService);

  expenses = signal<Expense[]>([]);

  removeExpense(index: number) {
    this.expenses.mutate(() => {
      this.expenses().splice(index, 1);
    });
  }

  addNewExpense(expense: Expense) {
    this.expenses.mutate(() => {
      this.expenses().push(expense);
    });
  }

  settleExpense(expenses: Expense[]) {
    this._expenseService.settleExpenses(expenses);
  }
}
