import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { sendOtpSuccess, verifyOtp, verifyOtpSuccess } from 'src/app/auth/+state/auth.actions';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {
  hide = true;
  phoneNumber: string = ''
  private _actionsSubscription: Subscription;
  otpFormGroup = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.pattern("^\\d{4}$")]),
  })
  constructor(private _router: Router,
    private _actions$: ActionsSubject,
    private _store: Store) {
    this.phoneNumber = this._router.getCurrentNavigation()?.extras?.state?.['phoneNumber'];
    this._actionsSubscription = this._actions$.pipe(
      ofType(verifyOtpSuccess)).subscribe(action => {
        console.log(action.token);
        // this._router.navigate(['/auth/otp'])
      })
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this._actionsSubscription.unsubscribe()
  }
  verify() {
    const otp = this.otpFormGroup.get('otp')?.value

    if (otp) {
      this._store.dispatch(verifyOtp({ otp, countryCode: 91, phoneNumber: this.phoneNumber }))
    }
  }
}
