import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { getHomeOwner } from 'src/app/home-owner/+state/home-owner.actions';
import { selectHomeOwner } from 'src/app/home-owner/+state/home-owner.selector';
import { AddFamilyComponent } from '../add-family/add-family.component';

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.scss']
})
export class ResidentComponent implements OnInit {

  homeOwner$ = this._store.select(selectHomeOwner());
  members: any;
  helpers: any;
  visitors: any;
  constructor(private _store: Store, 
    private _bottomSheet: MatBottomSheet
    ) {
    this._store.dispatch(getHomeOwner());
  }

  openBottomSheet(): void {
    
  }


  ngOnInit() { }

  openDailyHelp() {
    this._bottomSheet.open(AddFamilyComponent);
  }
}
