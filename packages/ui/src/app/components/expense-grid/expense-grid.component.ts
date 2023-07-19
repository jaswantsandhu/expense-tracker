import { Component, Input, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expense } from '../../interfaces/expense';
import { ExpenseService } from '../../services/expense.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'expense-tracker-expense-grid',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-grid.component.html',
  styleUrls: ['./expense-grid.component.scss'],
})
export class ExpenseGridComponent {
  expenses = signal<Expense[]>([]);
  total = computed(() => {
    return this.expenses().reduce((accu: number, curr: Expense) => {
      return accu + curr.amount;
    }, 0);
  });

  @Input() settle!: (expenses: Expense[]) => void;

  expenseForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    amount: new FormControl<number>(0.0, [Validators.required]),
  });

  addNewExpense() {
    this.expenses.mutate(() => {
      this.expenses().push(this.expenseForm.value as Expense);
    });
    this.expenseForm.reset();
  }

  removeExpense(index: number) {
    this.expenses.mutate(() => {
      this.expenses().splice(index, 1);
    });
  }

  settleExpenses() {
    this.settle(this.expenses());
  }
}
