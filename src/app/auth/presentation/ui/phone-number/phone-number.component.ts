import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { map, mergeMap, Subscription } from 'rxjs';
import { sendOtp, sendOtpSuccess } from 'src/app/auth/+state/auth.actions';
@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss']
})
export class PhoneNumberComponent implements OnInit, OnDestroy {
  private _actionsSubscription: Subscription;

  constructor(private _router: Router,
    private _actions$: ActionsSubject,
    private _store: Store) {

    this._actionsSubscription = this._actions$.pipe(
      ofType(sendOtpSuccess)).subscribe(_ => {
        this._router.navigate(['/otp'], {
          state: {
            phoneNumber: this.loginFormGroup.get('phoneNumber')?.value
          }
        })
      })
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this._actionsSubscription.unsubscribe()
  }

  loginFormGroup = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^\\d{7,12}$")]),
  })

  sendVerificationCode() {
    const phoneNumber = this.loginFormGroup.get('phoneNumber')?.value
    if (phoneNumber) {
      this._store.dispatch(sendOtp({ countryCode: 91, phoneNumber }))
    }
  }
}
