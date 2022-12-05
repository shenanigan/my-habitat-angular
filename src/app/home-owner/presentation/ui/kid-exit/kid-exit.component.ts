import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { allowKidExit } from 'src/app/home-owner/+state/home-owner.actions';
import { selectKids } from 'src/app/home-owner/+state/home-owner.selector';
import { KidExitRequest } from 'src/app/home-owner/domain/contracts/requests/kid-exit';
import { Household } from 'src/app/home-owner/domain/entities/household';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-kid-exit',
  templateUrl: './kid-exit.component.html',
  styleUrls: ['./kid-exit.component.scss']
})
export class KidExitComponent implements OnInit {

  readSASToken = environment.azureRWSASToken;
  selectedKid?: Household
  hours = 4
  kids$: Observable<Household[]> = this._store.select(selectKids())

  constructor(private _store: Store, private _sheet: MatBottomSheetRef<KidExitComponent>) {
    this.kids$.pipe(take(1)).subscribe(kids => {
      if (kids.length > 0) {
        this.selectedKid = kids[0]
      }
    });
  }

  ngOnInit(): void {
  }

  increment() {
    if (this.hours < 24) {
      this.hours = this.hours + 1
    }
  }

  decrement() {
    if (this.hours > 1) {
      this.hours = this.hours - 1
    }
  }

  allowExit() {
    if (this.selectedKid) {
      const kidExitRequest: KidExitRequest = {
        householdId: this.selectedKid.entityId,
        hours: this.hours
      }
      this._store.dispatch(allowKidExit({ kidExitRequest }))
      this._sheet.dismiss()
    }
  }
}
