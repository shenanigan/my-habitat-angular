import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Household } from 'src/app/home-owner/domain/entities/household';
import { requestVisit } from 'src/app/security-guard/+state/security-guard.actions';

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
      this._store.dispatch(requestVisit({ homeOwnerId: this.homeOwnerId, householdId: this.household?.entityId }))
    }
    setTimeout(() => {
      this.message = 'APPROVED'
      this.isApproved = true

      setTimeout(() => {
        this._router.navigate(['/security-guard'])
      }, 2000);
    }, 5000);
  }

  ngOnInit(): void {
  }

}
