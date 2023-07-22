import {
  Component,
  Output,
  computed,
  EventEmitter,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expense } from '@expense-tracker/data-model';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';

@Component({
  selector: 'expense-tracker-expense-grid',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ExpenseFormComponent],
  templateUrl: './expense-grid.component.html',
  styleUrls: ['./expense-grid.component.scss'],
})
export class ExpenseGridComponent {
  @Output() settle: EventEmitter<Expense[]> = new EventEmitter<Expense[]>();
  @Output() add: EventEmitter<Expense> = new EventEmitter<Expense>();
  @Output() remove: EventEmitter<number> = new EventEmitter<number>();

  @Input() expenses: Expense[] = [];

  total = computed(() => {
    return this.expenses.reduce((accu: number, curr: Expense) => {
      return accu + curr.amount;
    }, 0);
  });

  settleExpenses() {
    this.settle.emit(this.expenses);
  }
}
