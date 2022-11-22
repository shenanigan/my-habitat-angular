import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
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

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _store: Store) {
    const homeOwner: HomeOwner = data.homeOwner
    this.kids$ = this._store.select(selectKids(homeOwner.entityId))

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
  }
}
