import { Component, inject, isSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseGridComponent } from '../../components/expense-grid/expense-grid.component';
import { Expense, Payout } from '@expense-tracker/data-model';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseFormComponent } from '../../components/expense-form/expense-form.component';
import { PayoutModalComponent } from '../../components/payout-modal/payout-modal.component';

@Component({
  selector: 'expense-tracker-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ExpenseGridComponent,
    ExpenseFormComponent,
    PayoutModalComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  _expenseService = inject(ExpenseService);

  expenses = signal<Expense[]>([]);
  showPayoutModal = signal<boolean>(false);
  payouts = signal<Payout[]>([]);

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

  settleExpense() {
    this._expenseService
      .settleExpenses(this.expenses())
      .subscribe((response) => {
        this.payouts.set(response.payouts);
        this.showPayoutModal.set(true);
      });
  }

  close() {
    console.log('dash');
    this.showPayoutModal.set(!this.showPayoutModal());
  }
}
