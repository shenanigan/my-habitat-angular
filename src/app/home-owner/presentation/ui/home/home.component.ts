import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectHomeOwner } from 'src/app/home-owner/+state/home-owner.selector';
import { CancelKidExitRequest } from 'src/app/home-owner/domain/contracts/requests/cancel-kid-exit';
import { UpdateLogRequest } from 'src/app/home-owner/domain/contracts/requests/update-log';
import { Household } from 'src/app/home-owner/domain/entities/household';
import { Log } from 'src/app/home-owner/domain/entities/log';
import { Payment } from 'src/app/home-owner/domain/entities/payment';
import { IRealTimeService } from 'src/app/shared/domain/abstractions/irealtime.service';
import { AblyEvents } from 'src/app/shared/infrastructure/real-time/ably-events';
import { cancelKidExit, getHomeOwner, updateLog } from '../../../+state/home-owner.actions';
import { KidExitComponent } from '../kid-exit/kid-exit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  homeOwner$ = this._store.select(selectHomeOwner());
  hasUnreadMessages: boolean = false;
  showPopup: boolean = true;
  payment?:Payment;
  private _homeOwnerSubscription: Subscription;
  hidePopup: Array<string> = [];

  constructor(private _bottomSheet: MatBottomSheet,
    @Inject(AblyEvents) private _realtimeService: IRealTimeService,
    private _store: Store) {

    this._homeOwnerSubscription = this.homeOwner$.subscribe(homeOwner => {
      if (homeOwner.messages.length > 0 && homeOwner.hasViewedMessages.filter(x => x.key === homeOwner.entityId).length === 0) {
        this.hasUnreadMessages = true;
      } else {
        this.hasUnreadMessages = false;
      }
    })

    this._store.dispatch(getHomeOwner());
    this._realtimeService.listen()

  }

  ngOnInit(): void { }
  ngOnDestroy(): void {
    this._homeOwnerSubscription.unsubscribe()
  }

  openKidExit() {
    this._bottomSheet.open(KidExitComponent)
  }

  deny(log: Log) {
    const request: UpdateLogRequest = {
      logId: log.entityId,
      shouldApprove: false
    }
    this._store.dispatch(updateLog({ request }))
  }

  approve(log: Log) {
    const request: UpdateLogRequest = {
      logId: log.entityId,
      shouldApprove: true
    }
    this._store.dispatch(updateLog({ request }))
  }

  cancel(household: Household) {
    const request: CancelKidExitRequest = {
      householdId: household.entityId
    }
    this._store.dispatch(cancelKidExit({ request }))
  }

  
}
