import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dialog } from '@capacitor/dialog';
import { ofType } from '@ngrx/effects';
import { ScannedActionsSubject, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { cancelReservation, cancelReservationSuccess } from 'src/app/home-owner/+state/home-owner.actions';
import { ICancelReservation } from 'src/app/home-owner/domain/contracts/requests/cancel-reservation';
import { Reservation } from 'src/app/home-owner/domain/entities/reservation';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.scss'],
})
export class BookingSummaryComponent implements OnInit, OnDestroy {
  reservation?: Reservation;
  _actionsSubscription: Subscription

  constructor(private _router: Router,
    private _store: Store,
    private _actions$: ScannedActionsSubject) {
    this.reservation = this._router.getCurrentNavigation()?.extras?.state?.['reservation'];
    this._actionsSubscription = this._actions$.pipe(
      ofType(...[cancelReservationSuccess])).subscribe(action => {
        this._router.navigate(['/home-owner'], {
          replaceUrl: true
        });
      })
  }


  ngOnInit(): void { }

  ngOnDestroy(): void {
    this._actionsSubscription.unsubscribe()
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

  done() {
    this._router.navigate(['/home-owner'], { replaceUrl: true });
  }

  async cancel(selectedReservation: Reservation) {
    const { value } = await Dialog.confirm({
      title: 'Confirm',
      okButtonTitle: 'Cancel Reservation',
      cancelButtonTitle: 'Close',
      message: `Are you sure you'd like to cancel the reservation?`,
    });

    if (value) {
      const reservation: ICancelReservation = {
        amenity: selectedReservation.amenity!,
        oldStartDateTime: selectedReservation.startDateTime!,
        reservationId: selectedReservation.entityId,
      }

      this._store.dispatch(cancelReservation({ reservation }));
    }
  }
}
