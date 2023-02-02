import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScannedActionsSubject, Store } from '@ngrx/store';
import { Household } from 'src/app/home-owner/domain/entities/household';
import { requestKidExit, requestVisit } from 'src/app/security-guard/+state/security-guard.actions';
import * as Ably from 'ably';
import { Log } from 'src/app/home-owner/domain/entities/log';
import { Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';
import { logApproved, logRejected } from 'src/app/shared/+state/shared.actions';
import { IRealTimeService } from 'src/app/shared/domain/abstractions/irealtime.service';
import { AblyEvents } from 'src/app/shared/infrastructure/real-time/ably-events';


@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.scss']
})
export class RequestStatusComponent implements OnInit, OnDestroy {

  homeOwnerId?: string
  household?: Household
  message = "WAITING FOR APPROVAL"
  isApproved = false
  isRejected = false
  private _actionsSubscriptionForRejected: Subscription;
  private _actionsSubscriptionForApproved: Subscription;

  constructor(private _store: Store,
    private _actions$: ScannedActionsSubject,
    @Inject(AblyEvents) private _realtimeService: IRealTimeService,
    private _router: Router) {
    this.homeOwnerId = this._router.getCurrentNavigation()?.extras?.state?.['homeOwnerId'];
    this.household = this._router.getCurrentNavigation()?.extras?.state?.['household'];


    this._actionsSubscriptionForApproved = this._actions$.pipe(
      ofType(logApproved)).subscribe(action => {
        this.message = 'APPROVED'
        this.isApproved = true
      });

    this._actionsSubscriptionForRejected = this._actions$.pipe(
      ofType(logRejected)).subscribe(action => {
        this.message = 'REJECTED'
        this.isRejected = true
      });

    if (this.household?.entityId && this.homeOwnerId) {

      if (this.household.type === 'FAMILY_KID') {
        this._store.dispatch(requestKidExit({ homeOwnerId: this.homeOwnerId, householdId: this.household?.entityId }))
      } else {
        this._store.dispatch(requestVisit({ homeOwnerId: this.homeOwnerId, householdId: this.household?.entityId }))
      }

      this._realtimeService.listenToHO(this.homeOwnerId)
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._actionsSubscriptionForApproved.unsubscribe()
    this._actionsSubscriptionForRejected.unsubscribe()
  }

  close() {
    this._router.navigate(['/security-guard'])
  }

}
