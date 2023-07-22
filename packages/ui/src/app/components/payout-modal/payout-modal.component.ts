import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payout } from '@expense-tracker/data-model';

@Component({
  selector: 'expense-tracker-payout-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payout-modal.component.html',
  styleUrls: ['./payout-modal.component.scss'],
})
export class PayoutModalComponent {
  @Input() payouts: Payout[] = [];
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();


  close() {
    this.closeModal.emit();
  }
}
