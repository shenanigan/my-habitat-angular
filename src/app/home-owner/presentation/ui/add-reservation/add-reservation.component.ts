import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectSociety } from 'src/app/home-owner/+state/home-owner.selector';
import { Amenity } from 'src/app/home-owner/domain/entities/amenity';
import { StorageService } from 'src/app/shared/infrastructure/storage/storage.service';
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

  constructor(private _router: Router,
    private _store: Store) { }

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
