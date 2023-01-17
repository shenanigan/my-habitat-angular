import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/home-owner/domain/entities/reservation';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.scss'],
})
export class BookingSummaryComponent implements OnInit {
  reservation: Reservation = new Reservation('test', {
    eventStartDate: new Date(),
    type: 'Tennis',
    createdAt: new Date(),
    eventEndDate: new Date(),
  });
  myAngularxQrCode: string;
  constructor(private _router: Router) {
    this.myAngularxQrCode = 'Your QR code data string';
  }

  ngOnInit(): void {}

  edit(reservation: Reservation) {
    this._router.navigate(['/home-owner/add-reservation'], {
      state: {
        reservation,
      },
    });
  }
  done() {
    this._router.navigate(['/home-owner/reservations']);
  }
}
