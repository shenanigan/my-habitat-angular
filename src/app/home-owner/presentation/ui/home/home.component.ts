import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectHomeOwner } from 'src/app/home-owner/+state/home-owner.selector';
import { AddMessageRequest } from 'src/app/home-owner/domain/contracts/requests/add-message';
import { UpdateLogRequest } from 'src/app/home-owner/domain/contracts/requests/update-log';
import { Log } from 'src/app/home-owner/domain/entities/log';
import { addMessage, getHomeOwner, updateLog } from '../../../+state/home-owner.actions';
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
    this.homeOwner$.pipe(take(1)).subscribe(x => {
      const request: AddMessageRequest = {
        type: 'TEXT',
        text: 'HELLO WORLD'
      }
      this._store.dispatch(addMessage({ homeOwnerId: x.entityId, request }))
    })
    // this._bottomSheet.open(KidExitComponent)
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
