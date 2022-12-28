import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { getHomeOwner } from 'src/app/home-owner/+state/home-owner.actions';
import { Reservation } from 'src/app/home-owner/domain/entities/reservation';

@Component({
  selector: 'app-row-upcoming-reservation',
  templateUrl: './row-upcoming-reservation.component.html',
  styleUrls: ['./row-upcoming-reservation.component.scss']
})
export class RowUpcomingReservationComponent implements OnInit {

  @Input() reservation?: Reservation
  @Output() onEdit = new EventEmitter<Reservation>()
  constructor(private _store: Store) { }

  ngOnInit(): void {
  }

  cancel() {
    this._store.dispatch(getHomeOwner());
  }

  edit() {
    this.onEdit.emit(this.reservation)
  }

}
