import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() onRightClick: EventEmitter<void> = new EventEmitter();
  @Output() onRightClick2: EventEmitter<void> = new EventEmitter();
  @Output() onFavouriteClick: EventEmitter<void> = new EventEmitter();
  constructor(private _location: Location) { }

  get canShowLoader(): boolean {
    return environment.production
  }

  ngOnInit(): void {
    
  }

  back() {
    this._location.back();
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
