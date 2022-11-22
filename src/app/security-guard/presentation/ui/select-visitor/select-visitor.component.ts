import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectHomeOwner } from 'src/app/security-guard/+state/security-guard.selector';
import { HomeOwner } from 'src/app/security-guard/domain/entities/home-owner';
import { AddFamilyComponent } from '../add-family/add-family.component';

@Component({
  selector: 'app-select-visitor',
  templateUrl: './select-visitor.component.html',
  styleUrls: ['./select-visitor.component.scss']
})
export class SelectVisitorComponent implements OnInit, OnDestroy {

  homeOwner$?: Observable<HomeOwner>
  members: any;
  helpers: any;
  visitors: any;
  // subscription: Subscription;

  constructor(private _store: Store,
    private _bottomSheet: MatBottomSheet,
    private _router: Router,
    private _location: Location
  ) {

    const homeOwnerId = this._router.getCurrentNavigation()?.extras?.state?.['homeOwnerId'];

    // this.subscription = this.homeOwner$.subscribe(x => {
    //   this._bottomSheet.dismiss();
    // })

    if (homeOwnerId) {
      this.homeOwner$ = this._store.select(selectHomeOwner(homeOwnerId));
    }
  }

  openBottomSheet(): void {

  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe()
  }

  ngOnInit() { }

  openAddHousehold(type: string) {
    this._bottomSheet.open(AddFamilyComponent, {
      data: [{ type: type }]
    });
  }

  back() {
    this._location.back()
  }
}
