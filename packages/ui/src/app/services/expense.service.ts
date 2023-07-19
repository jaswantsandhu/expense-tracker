import { Injectable, inject, signal } from '@angular/core';
import { Expense } from '../interfaces/expense';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  _http = inject(HttpClient);

  settleExpenses(expenses: Expense[]) {
    this._http.post('http://localhost:3000/payouts', expenses).subscribe();
  }
}
