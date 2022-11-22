import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getSecurityGuard } from 'src/app/security-guard/+state/security-guard.actions';
import { KidExitComponent } from '../kid-exit/kid-exit.component';
import { SearchUnitContext } from '../search-unit/search-unit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router,
    private _store: Store) {
    this._store.dispatch(getSecurityGuard());
  }

  ngOnInit(): void {
  }

  openLogVisit() {
    this._router.navigate(['/security-guard/search-unit'], {
      state: {
        context: SearchUnitContext.logVisit
      }
    })
  }

  openKidExit() {
    this._router.navigate(['/security-guard/search-unit'], {
      state: {
        context: SearchUnitContext.kidExit
      }
    })
  }

}
