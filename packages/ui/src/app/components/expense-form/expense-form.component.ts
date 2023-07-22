import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Expense } from '@expense-tracker/data-model';

@Component({
  selector: 'expense-tracker-expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
})
export class ExpenseFormComponent {
  @Output() submitExpense: EventEmitter<Expense> = new EventEmitter<Expense>();

  expenseForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    amount: new FormControl<number>(0.0, [
      Validators.required,
      Validators.min(0.1),
    ]),
  });

  submit() {
    this.submitExpense.emit(this.expenseForm.value as Expense);
    this.expenseForm.reset({ name: '', amount: 0.0 });
  }
}
