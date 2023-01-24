import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { addReservation, editReservation, getHomeOwner } from 'src/app/home-owner/+state/home-owner.actions';
import { selectHomeOwner } from 'src/app/home-owner/+state/home-owner.selector';
import { IAddReservation } from 'src/app/home-owner/domain/contracts/requests/add-reservation';
import { IEditReservation } from 'src/app/home-owner/domain/contracts/requests/edit-reservation';
import { HomeOwner } from 'src/app/home-owner/domain/entities/home-owner';
import { Reservation } from 'src/app/home-owner/domain/entities/reservation';


export interface TimeSlot {
  startDateTime: Date
  endDateTime: Date
  available: boolean
}
@Component({
  selector: 'app-confirm-reservation',
  templateUrl: './confirm-reservation.component.html',
  styleUrls: ['./confirm-reservation.component.scss'],
})
export class ConfirmReservationComponent implements OnInit {
  amenity?: string;
  showPopup: boolean = true;
  timeSlots: TimeSlot[] = [];
  availableSlotCount = 0;
  selectedSlot?: TimeSlot;
  selectedDate?: Date;
  todaysDate: Date = new Date()
  homeOwner$ = this._store.select(selectHomeOwner());
  homeOwner?: HomeOwner
  reservation?: Reservation

  constructor(private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _store: Store) {
    this._activatedRoute.queryParams.subscribe(params => {
      this.amenity = params['amenity'];
    })

    this.reservation = this._router.getCurrentNavigation()?.extras?.state?.['reservation'];

    this.homeOwner$.pipe(take(2)).subscribe(homeOwner => {
      this.homeOwner = homeOwner;
      this.timeSlots = []
      const amenities = this.homeOwner.society?.amenities.filter(x => x.name === this.amenity)
      if ((amenities?.length ?? 0) > 0) {
        const amenity = amenities![0]
        if (amenity.startDateTime && amenity.endDateTime) {
          const difference = (amenity.endDateTime.getTime() - amenity.startDateTime.getTime()) / (1000 * 60 * 60);
          if (amenity.slotDuration) {
            const slots = (difference * 60) / amenity.slotDuration
            for (let index = 0; index < slots; index++) {
              var slotStartTime = new Date(amenity.startDateTime.getTime() + index * amenity.slotDuration * 60000);
              var slotEndTime = new Date(amenity.startDateTime.getTime() + (index + 1) * amenity.slotDuration * 60000);
              const timeSlot: TimeSlot = {
                startDateTime: slotStartTime,
                endDateTime: slotEndTime,
                available: true
              }
              this.timeSlots.push(timeSlot)
            }
          }
          this.availableSlotCount = this.timeSlots.length;
        }
      }
    })
    this._store.dispatch(getHomeOwner());
  }

  ngOnInit(): void { }

  selectDate(date: Date) {


    if (this.selectedDate) {
      if (this.selectedDate) {
        date.setHours(this.selectedDate.getHours())
        date.setMinutes(this.selectedDate.getMinutes())
        date.setSeconds(this.selectedDate.getSeconds())
        date.setMilliseconds(this.selectedDate.getMilliseconds())
      }

      // Based on the currently selected date and the previous selected date, update the time slot's date time
      const differenceMillis = date.getTime() - this.selectedDate.getTime();
      this.timeSlots.forEach(timeSlot => {
        timeSlot.startDateTime = new Date(timeSlot.startDateTime.getTime() + differenceMillis);
        timeSlot.endDateTime = new Date(timeSlot.endDateTime.getTime() + differenceMillis)
      })
    } else {
      // For the first time when date is selected. 
      // Update the time slot's date time based on the amenity's startDateTime and the currently selected date.
      const amenities = this.homeOwner?.society?.amenities.filter(x => x.name === this.amenity)
      if ((amenities?.length ?? 0) > 0) {
        const amenity = amenities![0]
        if (amenity.startDateTime) {
          date.setHours(amenity.startDateTime.getHours())
          date.setMinutes(amenity.startDateTime.getMinutes())
          date.setSeconds(amenity.startDateTime.getSeconds())
          date.setMilliseconds(amenity.startDateTime.getMilliseconds())
        }
        const differenceMillis = date.getTime() - (amenity.startDateTime?.getTime() ?? 0);
        this.timeSlots.forEach(timeSlot => {
          timeSlot.startDateTime = new Date(timeSlot.startDateTime.getTime() + differenceMillis);
          timeSlot.endDateTime = new Date(timeSlot.endDateTime.getTime() + differenceMillis)
        })
      }
    }

    this.selectedDate = date;

    // Considering UTC the timeslots might be spread over two date keys
    // Hence take the current date and the previous date.
    const stringDate = this.selectedDate.getFullYear() + '-' + (this.selectedDate.getMonth() + 1).toString().padStart(2, '0') + '-' + this.selectedDate.getDate().toString().padStart(2, '0')
    var stringDate2 = this.selectedDate.getUTCFullYear() + '-' + (this.selectedDate.getUTCMonth() + 1).toString().padStart(2, '0') + '-' + this.selectedDate.getUTCDate().toString().padStart(2, '0')

    if (this.amenity && this.homeOwner?.society?.reservations[this.amenity]) {
      const dateReservations = [...(this.homeOwner?.society?.reservations[this.amenity][stringDate] ?? []), ...(this.homeOwner?.society?.reservations[this.amenity][stringDate2] ?? [])]
      // Reset the time slots to true so that it can be set to false when overlapped in the code below
      this.timeSlots.forEach(timeSlot => {
        timeSlot.available = true;
      })
      this.availableSlotCount = this.timeSlots.length;
      if (dateReservations) {
        // Find the overlaps for the time slots
        dateReservations.forEach(reservation => {


          if (reservation.startDateTime && reservation.endDateTime) {
            const sdt2 = reservation?.startDateTime?.getTime() ?? 0
            const edt2 = reservation?.endDateTime?.getTime() ?? 0

            this.timeSlots.forEach(timeSlot => {
              const sdt1 = timeSlot.startDateTime.getTime()
              const edt1 = timeSlot.endDateTime.getTime()
              if ((sdt1 < edt2 && edt1 > sdt2) || (sdt1 === sdt2)) {
                timeSlot.available = false;

              }
            })

            this.availableSlotCount = this.timeSlots.filter(x => x.available).length;
          }
        });
      }
    }
  }
  selectSlot(timeSlot: TimeSlot) {
    if (timeSlot.available) {
      this.selectedSlot = timeSlot;
    }
  }

  confirm() {
    if (this.selectedSlot && this.amenity) {
      if (this.reservation) {
        const reservation: IEditReservation = {
          amenity: this.amenity,
          startDateTime: this.selectedSlot?.startDateTime,
          endDateTime: this.selectedSlot?.endDateTime,
          reservationId: this.reservation.entityId,
          oldStartDateTime: this.reservation.startDateTime
        }

        this._store.dispatch(editReservation({ reservation }));

        this.homeOwner$.pipe(take(1)).subscribe(homeOwner => {
          const r = new Reservation("New Booking", reservation)
          this._router.navigate(['/home-owner/booking-summary'], {
            state: {
              reservation: r,
            },
          });
        })
      }
      else {
        const reservation: IAddReservation = {
          amenity: this.amenity,
          startDateTime: this.selectedSlot?.startDateTime,
          endDateTime: this.selectedSlot?.endDateTime,
        }

        this._store.dispatch(addReservation({ reservation }));

        this.homeOwner$.pipe(take(1)).subscribe(homeOwner => {
          const r = new Reservation("New Booking", reservation)
          this._router.navigate(['/home-owner/booking-summary'], {
            state: {
              reservation: r,
            },
          });
        })
      }
    }


  }
}
