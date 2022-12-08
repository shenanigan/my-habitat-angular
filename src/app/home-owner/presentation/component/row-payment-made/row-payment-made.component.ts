import { Component, Input, OnInit } from '@angular/core';
import { Payment } from 'src/app/home-owner/domain/entities/payment';

@Component({
  selector: 'app-row-payment-made',
  templateUrl: './row-payment-made.component.html',
  styleUrls: ['./row-payment-made.component.scss']
})
export class RowPaymentMadeComponent implements OnInit {

  @Input() payment?: Payment
  constructor() { }

  ngOnInit(): void {
  }

}
