import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { selectHomeOwner } from 'src/app/home-owner/+state/home-owner.selector';
import { UpdateLogRequest } from 'src/app/home-owner/domain/contracts/requests/update-log';
import { Log } from 'src/app/home-owner/domain/entities/log';
import { getHomeOwner, updateLog } from '../../../+state/home-owner.actions';
import { KidExitComponent } from '../kid-exit/kid-exit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeOwner$ = this._store.select(selectHomeOwner());
  constructor(private _bottomSheet: MatBottomSheet,
    private _store: Store) {
    this._store.dispatch(getHomeOwner());
  }

  ngOnInit(): void {
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
}
