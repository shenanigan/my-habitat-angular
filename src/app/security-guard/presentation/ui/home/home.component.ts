import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getSecurityGuard } from 'src/app/security-guard/+state/security-guard.actions';
import { selectSecurityGuard } from 'src/app/security-guard/+state/security-guard.selector';
import { SecurityGuard } from 'src/app/security-guard/domain/entities/security-guard';
import { IRealTimeService } from 'src/app/shared/domain/abstractions/irealtime.service';
import { AblyEvents } from 'src/app/shared/infrastructure/real-time/ably-events';
import { KidExitComponent } from '../kid-exit/kid-exit.component';
import { SearchUnitContext } from '../search-unit/search-unit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  securityGuard$: Observable<SecurityGuard> = this._store.select(selectSecurityGuard());

  constructor(private _router: Router,
    @Inject(AblyEvents) private _realtimeService: IRealTimeService,
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
