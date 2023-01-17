import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-reservation',
  templateUrl: './confirm-reservation.component.html',
  styleUrls: ['./confirm-reservation.component.scss'],
})
export class ConfirmReservationComponent implements OnInit {
  amenity: string;
  showPopup: boolean = true;
  timeSlots: { title: string; available: boolean }[] = [
    { title: '0600-0700 am', available: true },
    { title: '0600-0700 am', available: true },
    { title: '0600-0700 am', available: false },
    { title: '0600-0700 am', available: false },
    { title: '0600-0700 am', available: true },
    { title: '0600-0700 am', available: true },
    { title: '0600-0700 am', available: false },
    { title: '0600-0700 am', available: true },
    { title: '0600-0700 am', available: false },
    { title: '0600-0700 am', available: false },
    { title: '0600-0700 am', available: true },
    { title: '0600-0700 am', available: false },
    { title: '0600-0700 am', available: false },
  ];
  selectedSlot?: number;
  selectedDate: Date = new Date();
  constructor(private _router: Router) {
    this.amenity =
      this._router.getCurrentNavigation()?.extras?.state?.['amenity'];
  }

  ngOnInit(): void {}

  selectDate(date: Date) {
    this.selectedDate = date;
  }
  selectSlot(index: number, timeSlot: { title: string; available: boolean }) {
    if (timeSlot.available) this.selectedSlot = index;
  }

  confirm() {
    this._router.navigate(['/home-owner/booking-summary']);
  }
}
