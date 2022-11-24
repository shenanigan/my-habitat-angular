import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { requestKidExit } from 'src/app/security-guard/+state/security-guard.actions';
import { selectKids } from 'src/app/security-guard/+state/security-guard.selector';
import { HomeOwner } from 'src/app/security-guard/domain/entities/home-owner';
import { Household } from 'src/app/security-guard/domain/entities/household';

@Component({
  selector: 'app-kid-exit',
  templateUrl: './kid-exit.component.html',
  styleUrls: ['./kid-exit.component.scss']
})
export class KidExitComponent implements OnInit {

  selectedKid?: Household
  hours = 4
  kids$?: Observable<Household[]>
  homeOwnerId: string;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _store: Store,
    private _sheet: MatBottomSheetRef<KidExitComponent>) {
    const homeOwner: HomeOwner = data.homeOwner
    this.homeOwnerId = homeOwner.entityId
    this.kids$ = this._store.select(selectKids(homeOwner.entityId))

    this.kids$.pipe(take(1)).subscribe(kids => {
      if (kids.length > 0) {
        this.selectedKid = kids[0]
      }
    });
  }

  ngOnInit(): void {

  }

  requestExit() {
    if (this.selectedKid) {
      this._store.dispatch(requestKidExit({ homeOwnerId: this.homeOwnerId, householdId: this.selectedKid?.entityId }))
      this._sheet.dismiss()
    }
  }
}
