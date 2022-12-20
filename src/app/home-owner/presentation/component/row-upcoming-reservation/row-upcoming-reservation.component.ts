import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/home-owner/domain/entities/reservation';

@Component({
  selector: 'app-row-upcoming-reservation',
  templateUrl: './row-upcoming-reservation.component.html',
  styleUrls: ['./row-upcoming-reservation.component.scss']
})
export class RowUpcomingReservationComponent implements OnInit {

  @Input() reservation?: Reservation
  constructor() { }

  ngOnInit(): void {
  }

}
