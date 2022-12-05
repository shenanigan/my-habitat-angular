import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Household } from 'src/app/home-owner/domain/entities/household';
import { requestKidExit, requestVisit } from 'src/app/security-guard/+state/security-guard.actions';
import * as Ably from 'ably';
import { Log } from 'src/app/home-owner/domain/entities/log';


@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.scss']
})
export class RequestStatusComponent implements OnInit {

  homeOwnerId?: string
  household?: Household
  message = "WAITING FOR APPROVAL"
  isApproved = false
  isRejected = false

  constructor(private _store: Store,
    private _router: Router) {
    this.homeOwnerId = this._router.getCurrentNavigation()?.extras?.state?.['homeOwnerId'];
    this.household = this._router.getCurrentNavigation()?.extras?.state?.['household'];


    if (this.household?.entityId && this.homeOwnerId) {
      
      if (this.household.type === 'FAMILY_KID') {
        this._store.dispatch(requestKidExit({ homeOwnerId: this.homeOwnerId, householdId: this.household?.entityId }))
      } else {
        this._store.dispatch(requestVisit({ homeOwnerId: this.homeOwnerId, householdId: this.household?.entityId }))
      }

      let options: Ably.Types.ClientOptions = { key: 'm2BStQ.WYEoaw:WRC5iiG2PcIyhJW1fXTV-jGVlsINETMflLHfuOGexGk' };
      let client = new Ably.Realtime(options);
      let channel = client.channels.get(this.homeOwnerId); /* inferred type Ably.Types.RealtimeChannel */
      client.connection.on('connected', () => {
        channel.subscribe('LOG_ACTION', (message) => {
          channel.unsubscribe('LOG_ACTION');
          const log: Log = message.data
          if (log) {
            if (log.status === 'APPROVED') {
              this.message = 'APPROVED'
              this.isApproved = true
            } else {
              this.message = 'REJECTED'
              this.isRejected = true
            }
          }
        })
      });
    }
  }

  ngOnInit(): void {
  }

  close() {
    this._router.navigate(['/security-guard'])
  }

}
