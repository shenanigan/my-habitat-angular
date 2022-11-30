import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getHomeOwner } from 'src/app/home-owner/+state/home-owner.actions';
import { selectHomeOwner } from 'src/app/home-owner/+state/home-owner.selector';
import { environment } from 'src/environments/environment';
import { AddFamilyComponent } from '../add-family/add-family.component';

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.scss']
})
export class ResidentComponent implements OnInit, OnDestroy {

  homeOwner$ = this._store.select(selectHomeOwner());
  members: any;
  helpers: any;
  visitors: any;
  subscription: Subscription;
  readSASToken = environment.azureRWSASToken;

  constructor(private _store: Store,
    private _bottomSheet: MatBottomSheet
  ) {

    this.subscription = this.homeOwner$.subscribe(x => {
      this._bottomSheet.dismiss();
    })
  }

  openBottomSheet(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit() { }

  openAddHousehold(type: string) {
    this._bottomSheet.open(AddFamilyComponent, {
      data: [{ type: type }]
    });
  }
}
