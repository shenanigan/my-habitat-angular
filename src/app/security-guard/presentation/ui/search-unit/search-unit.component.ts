import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { interval, Observable, Subscription } from 'rxjs';
import { searchUnit } from 'src/app/security-guard/+state/security-guard.actions';
import { selectSearchHomeOwners } from 'src/app/security-guard/+state/security-guard.selector';
import { HomeOwner } from 'src/app/security-guard/domain/entities/home-owner';
import { Location } from '@angular/common';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { KidExitComponent } from '../kid-exit/kid-exit.component';


export enum SearchUnitContext {
  logVisit,
  kidExit
}


@Component({
  selector: 'app-search-unit',
  templateUrl: './search-unit.component.html',
  styleUrls: ['./search-unit.component.scss']
})
export class SearchUnitComponent implements OnInit {


  // SearchUnitContext = SearchUnitContext
  searchUnitContext = SearchUnitContext.logVisit
  searchFormGroup = new FormGroup({
    unit: new FormControl('', [Validators.required]),
  })

  subscriptionSearchDelay?: Subscription
  homeOwners$: Observable<HomeOwner[]> = this._store.select(selectSearchHomeOwners())

  constructor(private _store: Store,
    private _location: Location,
    private _bottomSheet: MatBottomSheet,
    private _router: Router) {

    const ctx = this._router.getCurrentNavigation()?.extras?.state?.['context'];
    if (ctx === 0) {
      this.searchUnitContext = SearchUnitContext.logVisit;
    } else if (ctx === 1) {
      this.searchUnitContext = SearchUnitContext.kidExit;
    }


    const secondsCounter = interval(500);
    this.searchFormGroup.get('unit')?.valueChanges.subscribe(unit => {
      this.subscriptionSearchDelay?.unsubscribe()
      this.subscriptionSearchDelay = secondsCounter.subscribe(() => {
        this.subscriptionSearchDelay?.unsubscribe()
        if (unit && (unit?.length ?? 0) > 0) {
          this._store.dispatch(searchUnit({ unit }));
        }
      })
    })
  }

  ngOnInit(): void {
  }

  selectHomeOwner(homeOwner: HomeOwner) {
    if (this.searchUnitContext === SearchUnitContext.logVisit) {
      this._router.navigate(['/security-guard/select-visitor'], {
        state: {
          homeOwnerId: homeOwner.entityId
        }
      })
    } else if (this.searchUnitContext === SearchUnitContext.kidExit) {
      this._bottomSheet.open(KidExitComponent, {
        data: { homeOwner: homeOwner }
      })
    }
  }


  back() {
    this._location.back()
  }

}
