import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addReservation, getHomeOwner } from 'src/app/home-owner/+state/home-owner.actions';
import { selectHomeOwner, selectSociety } from 'src/app/home-owner/+state/home-owner.selector';
import { Amenity } from 'src/app/home-owner/domain/entities/amenity';
import { Reservation } from 'src/app/home-owner/domain/entities/reservation';
import { Society } from 'src/app/home-owner/domain/entities/society';
import { StorageService } from 'src/app/shared/infrastructure/storage/storage.service';
import { getSociety } from 'src/app/society/+state/society.actions';
export { };
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
  society$ = this._store.select(selectSociety())
  amenities: Amenity[] = [
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

  constructor(private _router: Router,
    private _store: Store,
    private _storageService: StorageService) {
    const societyId = this._storageService.getSocietyId()
    if (societyId) {
      this._store.dispatch(getSociety({ societyId: societyId }))
    }
  }

  ngAfterViewInit(): void {
    if (this.isAdded === false) {
      this.isAdded = true;
    }
  }

  ngOnInit(): void { }

  redirect(amenity: string) {
    this._router.navigate(['/home-owner/confirm-reservation'], { queryParams: { amenity } });
  }
}
