import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/home-owner/domain/entities/reservation';

@Component({
  selector: 'app-row-completed-reservation',
  templateUrl: './row-completed-reservation.component.html',
  styleUrls: ['./row-completed-reservation.component.scss']
})
export class RowCompletedReservationComponent implements OnInit {

  @Input() reservation?: Reservation

  constructor() { }

  ngOnInit(): void {
  }

}
