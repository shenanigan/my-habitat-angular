import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { requestKidExit } from 'src/app/security-guard/+state/security-guard.actions';
import { selectKids } from 'src/app/security-guard/+state/security-guard.selector';
import { HomeOwner } from 'src/app/security-guard/domain/entities/home-owner';
import { Household } from 'src/app/security-guard/domain/entities/household';
import { environment } from 'src/environments/environment';

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
  readSASToken = environment.azureRWSASToken;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _store: Store,
    private _router: Router,
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
      this._sheet.dismiss()
      this._router.navigate(['/security-guard/request-status'], {
        state: {
          homeOwnerId: this.homeOwnerId,
          household: this.selectedKid
        }
      })
    }
  }
}
