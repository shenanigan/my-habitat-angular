import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getHomeOwner, markPaymentPaid } from 'src/app/home-owner/+state/home-owner.actions';
import { selectHomeOwner } from 'src/app/home-owner/+state/home-owner.selector';
import { IMarkPaymentPaidRequest } from 'src/app/home-owner/domain/contracts/requests/mark-payment-paid-request';
import { HomeOwner } from 'src/app/home-owner/domain/entities/home-owner';
import { Payment } from 'src/app/home-owner/domain/entities/payment';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  homeOwner$: Observable<HomeOwner> = this._store.select(selectHomeOwner());

  constructor(private _store: Store) {
    this._store.dispatch(getHomeOwner());
  }

  ngOnInit(): void {
  }

  markPaid(payment: Payment) {
    const request: IMarkPaymentPaidRequest = {
      paymentDetails: 'Paid By Home Owner',
      paymentId: payment.entityId,
      paymentMethod: 'In-Person'
    }
    this._store.dispatch(markPaymentPaid({ request }));
  }

  payNow(payment: Payment) {

  }

}
