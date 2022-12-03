import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { createEffect, ofType } from "@ngrx/effects";
import { ActionsSubject } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { failed } from "src/app/shared/+state/shared.actions";
import { Household } from "../domain/entities/household";
import { Message } from "../domain/entities/message";
import { AbstractHomeOwnerService } from "../domain/services/ihome-owner.service";
import { addHousehold, addHouseholdSuccess, addMessage, addMessageSuccess, allowKidExit, allowKidExitSuccess, getHomeOwner, getHomeOwnerSuccess, updateLog, updateLogSuccess } from "./home-owner.actions";

@Injectable()
export class HomeOwnerEffects {

    constructor(
        private _actions$: ActionsSubject,
        private _homeOwnerService: AbstractHomeOwnerService,
        private _snackBarService: MatSnackBar) { }


    getHomeOwner$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(getHomeOwner),
                switchMap(_ => {
                    return this._homeOwnerService.getHomeOwner().
                        pipe(map(homeOwner => getHomeOwnerSuccess({ homeOwner })),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )

    addHousehold$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(addHousehold),
                switchMap(d => {
                    return this._homeOwnerService.addHousehold(d.household).
                        pipe(map(householdId => {
                            var household = new Household(householdId, d.household)
                            return addHouseholdSuccess({ household })
                        }),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )

    allowKidExit$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(allowKidExit),
                switchMap(d => {
                    return this._homeOwnerService.allowKidExit(d.kidExitRequest).
                        pipe(map(_ => allowKidExitSuccess),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )

    updateLog$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(updateLog),
                switchMap(d => {
                    return this._homeOwnerService.updateLog(d.request).
                        pipe(map(_ => {
                            return updateLogSuccess({ logId: d.request.logId, shouldApprove: d.request.shouldApprove })
                        }),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )

    addMessage$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(addMessage),
                switchMap(d => {
                    return this._homeOwnerService.addMessage(d.request).
                        pipe(map(_ => {
                            var message = new Message('_', d.request)
                            message.createdAt = new Date()
                            message.sentById = d.homeOwnerId
                            return addMessageSuccess({ message })
                        }),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )

}