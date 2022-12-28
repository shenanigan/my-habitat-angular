import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { reservationAdded } from 'src/app/shared/+state/shared.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() bkgClass: string | undefined
  @Input() title: string | undefined
  @Input() rightIcon: string | undefined
  @Input() rightIcon2: string | undefined
  @Input() rightText: string | undefined
  @Input() showFavourite: boolean = false
  @Input() isFavourite?: boolean | null
  @Input() showLogo: boolean = false
  @Input() hasCalendly: boolean = false
  @Input() calendlySuccessRoutingLength: number = 7

  @Output() onRightClick: EventEmitter<void> = new EventEmitter();
  @Output() onRightClick2: EventEmitter<void> = new EventEmitter();
  @Output() onFavouriteClick: EventEmitter<void> = new EventEmitter();
  constructor(private _location: Location,
    private _store: Store) { }

  get canShowLoader(): boolean {
    return environment.production
  }

  ngOnInit(): void {

  }

  back() {
    if (this.hasCalendly) {
      // An event in scheduled is
      if (window.history.length === this.calendlySuccessRoutingLength) {
        this._store.dispatch(reservationAdded())
      }
      window.history.go(3 - window.history.length)
    } else {
      this._location.back()
    }
  }

  rightClick() {
    this.onRightClick.emit();
  }

  rightClick2() {
    this.onRightClick2.emit();
  }

  favouriteClick() {
    this.isFavourite = !this.isFavourite
    this.onFavouriteClick.emit();
  }
}
