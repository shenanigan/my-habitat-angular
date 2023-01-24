import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/home-owner/domain/entities/reservation';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.scss'],
})
export class BookingSummaryComponent implements OnInit {
  reservation?: Reservation;

  constructor(private _router: Router) {
    this.reservation = this._router.getCurrentNavigation()?.extras?.state?.['reservation'];
  }


  ngOnInit(): void { }

  edit(reservation: Reservation) {
    this._router.navigate(['/home-owner/add-reservation'], {
      state: {
        reservation,
      }
    });
  }

  done() {
    this._router.navigate(['/home-owner'], { replaceUrl: true });
  }
}
