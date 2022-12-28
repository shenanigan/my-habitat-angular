import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectHomeOwner } from 'src/app/home-owner/+state/home-owner.selector';
import { HomeOwner } from 'src/app/home-owner/domain/entities/home-owner';
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


  homeOwner$: Observable<HomeOwner> = this._store.select(selectHomeOwner());

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

  constructor(private _router: Router,
    private _store: Store) { }

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

  edit(reservation: Reservation) {
    this._router.navigate(['/home-owner/add-reservation'], {
      state: {
        reservation
      }
    })
  }
}
