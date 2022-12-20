import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/home-owner/domain/entities/reservation';

export interface Filter {
  name: string
}

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {


  reservations: Reservation[] = [
    {
      entityId: '',
      createdAt: new Date(),
      eventEndDate: new Date(1672525565000),
      eventStartDate: new Date(1672525523000),
      type: 'Tennis'
    },
    {
      entityId: '',
      createdAt: new Date(),
      eventEndDate: new Date(1670525523000),
      eventStartDate: new Date(1670525223000),
      type: 'Swimming'
    }
  ]
  filters: Filter[] = [
    {
      name: 'All'
    },
    {
      name: 'Upcoming'
    },
    {
      name: 'Completed'
    }
  ]

  activeFilter: Filter = this.filters[0];

  constructor(private _router: Router) { }

  ngOnInit(): void { }

  openAddReservation() {
    this._router.navigate(['/home-owner/add-reservation'])
  }

  isUpcoming(reservation: Reservation): boolean {

    if (reservation.eventStartDate) {
      const startDate = new Date(reservation.eventStartDate);
      if (startDate > new Date()) {
        return true
      }
    }
    return false;
  }

  isCompleted(reservation: Reservation): boolean {
    if (reservation.eventEndDate) {
      const endDate = new Date(reservation.eventEndDate);
      if (endDate < new Date()) {
        return true
      }
    }
    return false;
  }
}
