import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Expense, Payout, PayoutsResponse } from '@expense-tracker/data-model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  _http = inject(HttpClient);

  settleExpenses(expenses: Expense[]) {
    return this._http
      .post<PayoutsResponse>('http://localhost:3000/payouts', { expenses })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error occurred:', error.message);
          return throwError(() => new Error(error.message))
        })
      );
  }
}
