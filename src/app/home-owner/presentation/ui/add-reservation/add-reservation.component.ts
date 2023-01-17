import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addReservation } from 'src/app/home-owner/+state/home-owner.actions';
import { Reservation } from 'src/app/home-owner/domain/entities/reservation';
export {};
declare global {
  interface Window {
    Calendly: any;
  }
}

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss'],
})
export class AddReservationComponent implements OnInit, AfterViewInit {
  isAdded = false;
  reservation?: Reservation;
  amenities: any[] = [
    { icon: 'assets/images/ic_defaultuser.svg', name: 'Swimming Pool' },
    {
      icon: 'assets/images/ic_defaultuser.svg',
      name: 'Specialisation',
    },
    { icon: 'assets/images/ic_defaultuser.svg', name: 'Gym' },
    {
      icon: 'assets/images/ic_defaultuser.svg',
      name: 'Practice Places',
    },
    { icon: 'assets/images/ic_defaultuser.svg', name: 'Parking Spot' },
    { icon: 'assets/images/ic_defaultuser.svg', name: 'Yoga Room' },
    {
      icon: 'assets/images/ic_defaultuser.svg',
      name: 'Music Room',
    },
    {
      icon: 'assets/images/ic_defaultuser.svg',
      name: 'Golf',
    },
    {
      icon: 'assets/images/ic_defaultuser.svg',
      name: 'Table Tennis',
    },
    {
      icon: 'assets/images/ic_defaultuser.svg',
      name: 'Tennis',
    },
    {
      icon: 'assets/images/ic_defaultuser.svg',
      name: 'Basket Ball',
    },
    {
      icon: 'assets/images/ic_defaultuser.svg',
      name: 'Jacuzzi',
    },
    {
      icon: 'assets/images/ic_defaultuser.svg',
      name: 'Kids Room',
    },
  ];

  constructor(private _router: Router, private _store: Store) {
    // this.reservation =
    //   _router.getCurrentNavigation()?.extras?.state?.['reservation'];
  }

  ngAfterViewInit(): void {
    if (this.isAdded === false) {
      this.isAdded = true;
      this._store.dispatch(addReservation());
    }
  }

  ngOnInit(): void {
    // if (this.reservation) {
    //   window.Calendly.initInlineWidget({
    //     url: 'https://calendly.com/reschedulings/a58a3765-b159-4b8d-a56e-19649c8fa974',
    //     parentElement: document.querySelector('.calendly-inline-widget'),
    //   });
    // } else {
    //   window.Calendly.initInlineWidget({
    //     url: 'https://calendly.com/arjav-dave?name=Arjav&email=arjav@royalecheese.com&hide_gdpr_banner=1',
    //     parentElement: document.querySelector('.calendly-inline-widget'),
    //   });
    // }
  }

  redirect(amenity: string) {
    this._router.navigate(['/home-owner/confirm-reservation'], {
      state: {
        amenity,
      },
    });
  }
}
