import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { createEffect, ofType } from "@ngrx/effects";
import { ActionsSubject } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { ISendOtpRequest } from "../domain/contracts/requests/send-otp-request";
import { IVerifyOtpRequest } from "../domain/contracts/requests/verify-otp-request";
import { AbstractAuthService } from "../domain/services/iauth.service";
import { failed, sendOtp, sendOtpSuccess, verifyOtp, verifyOtpSuccess } from "./auth.actions";

@Injectable()
export class AuthEffects {

    constructor(
        private _actions$: ActionsSubject,
        private _authService: AbstractAuthService,
        private _snackBarService: MatSnackBar) { }


    sendOtp$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(sendOtp),
                switchMap(d => {
                    const request: ISendOtpRequest = {
                        countryCode: d.countryCode,
                        phoneNumber: d.phoneNumber
                    }
                    return this._authService.sendOtp(request).
                        pipe(map(_ => sendOtpSuccess()),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )


    verifyOtp$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(verifyOtp),
                switchMap(d => {
                    const request: IVerifyOtpRequest = {
                        countryCode: d.countryCode,
                        phoneNumber: d.phoneNumber,
                        otp: d.otp
                    }
                    return this._authService.sendOtp(request).
                        pipe(map(_ => verifyOtpSuccess()),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )

}