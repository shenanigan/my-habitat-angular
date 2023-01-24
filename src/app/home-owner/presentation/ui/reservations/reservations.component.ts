import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { cancelReservation, getHomeOwner } from 'src/app/home-owner/+state/home-owner.actions';
import { selectHomeOwner } from 'src/app/home-owner/+state/home-owner.selector';
import { ICancelReservation } from 'src/app/home-owner/domain/contracts/requests/cancel-reservation';
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
    private _store: Store) {
  }

  ngOnInit(): void { }

  openAddReservation() {
    this._router.navigate(['/home-owner/add-reservation'])
  }

  isUpcoming(reservation: Reservation): boolean {

    if (reservation.startDateTime) {
      const startDate = new Date(reservation.startDateTime);
      if (startDate > new Date()) {
        return true
      }
    }
    return false;
  }

  isCompleted(reservation: Reservation): boolean {
    if (reservation.endDateTime) {
      const endDate = new Date(reservation.endDateTime);
      if (endDate < new Date()) {
        return true
      }
    }
    return false;
  }

  edit(reservation: Reservation) {
    this._router.navigate(['/home-owner/confirm-reservation'], {
      state: {
        reservation
      },
      queryParams: {
        amenity: reservation.amenity
      }
    })
  }

  cancel(selectedReservation: Reservation) {
    const reservation: ICancelReservation = {
      amenity: selectedReservation.amenity!,
      oldStartDateTime: selectedReservation.startDateTime!,
      reservationId: selectedReservation.entityId,
    }

    this._store.dispatch(cancelReservation({ reservation }));
  }
}
