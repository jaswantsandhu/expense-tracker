import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayoutModalComponent } from './payout-modal.component';

describe('PayoutModalComponent', () => {
  let component: PayoutModalComponent;
  let fixture: ComponentFixture<PayoutModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayoutModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PayoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
