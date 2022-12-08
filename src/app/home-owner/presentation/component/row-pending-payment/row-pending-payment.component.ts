import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Payment } from 'src/app/home-owner/domain/entities/payment';

@Component({
  selector: 'app-row-pending-payment',
  templateUrl: './row-pending-payment.component.html',
  styleUrls: ['./row-pending-payment.component.scss']
})
export class RowPendingPaymentComponent implements OnInit {

  @Input() payment?: Payment
  @Output() onMarkPaid = new EventEmitter<Payment>()
  @Output() onPayNow = new EventEmitter<Payment>()

  constructor() { }

  ngOnInit(): void {
  }

  markPaid() {
    this.onMarkPaid.emit(this.payment);
  }

  payNow() {
    this.onPayNow.emit(this.payment);
  }

}
