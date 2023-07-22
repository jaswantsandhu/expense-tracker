import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ExpenseFormComponent } from './expense-form.component';

describe('ExpenseFormComponent', () => {
  let component: ExpenseFormComponent;
  let fixture: ComponentFixture<ExpenseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ExpenseFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display validation error for name when empty', () => {
    component.expenseForm.controls['name'].setValue('');
    component.expenseForm.controls['name'].markAsTouched();
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(By.css('small.text-red-500'));
    expect(errorEl.nativeElement.textContent).toContain('Name is required.');
  });

  it('should display validation error for amount when negative', () => {
    component.expenseForm.controls['amount'].setValue(-1);
    component.expenseForm.controls['amount'].markAsTouched();
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(By.css('small.text-red-500'));
    expect(errorEl.nativeElement.textContent).toContain(
      'Expense must be a positive amount.'
    );
  });

  it('should emit valid form data on submit', () => {
    jest.spyOn(component.submitExpense, 'emit');
    const testExpense = { name: 'User 1', amount: 10.5 };

    component.expenseForm.controls['name'].setValue(testExpense.name);
    component.expenseForm.controls['amount'].setValue(testExpense.amount);

    component.submit();

    expect(component.submitExpense.emit).toHaveBeenCalledWith(testExpense);
  });

  it('should reset form after submit', () => {
    const testExpense = { name: 'User 1', amount: 10.5 };

    component.expenseForm.controls['name'].setValue(testExpense.name);
    component.expenseForm.controls['amount'].setValue(testExpense.amount);

    component.submit();

    expect(component.expenseForm.value).toEqual({ name: '', amount: 0.0 });
  });
});
