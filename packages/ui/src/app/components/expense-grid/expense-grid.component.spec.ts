import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { ExpenseGridComponent } from './expense-grid.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

describe('ExpenseGridComponent', () => {
  let component: ExpenseGridComponent;
  let fixture: ComponentFixture<ExpenseGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, ExpenseGridComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseGridComponent);
    component = fixture.componentInstance;
    component.expenses = [
      { name: 'User 1', amount: 100 },
      { name: 'User 2', amount: 50 },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the total correctly', () => {
    expect(component.total()).toEqual(150);
  });

  it('should emit remove event when remove is called', () => {
    jest.spyOn(component.remove, 'emit');

    const indexToRemove = 0;
    component.remove.emit(indexToRemove);

    expect(component.remove.emit).toHaveBeenCalledWith(indexToRemove);
  });

  it('should emit settle event with expenses when settleExpenses is called', () => {
    jest.spyOn(component.settle, 'emit');

    component.settleExpenses();

    expect(component.settle.emit).toHaveBeenCalledWith(component.expenses);
  });
});
