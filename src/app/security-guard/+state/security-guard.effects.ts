import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { createEffect, ofType } from "@ngrx/effects";
import { ActionsSubject } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { failed } from "src/app/shared/+state/shared.actions";
import { RequestKidExitRequest } from "../domain/contracts/requests/request-kid-exit";
import { RequestVisitRequest } from "../domain/contracts/requests/request-visit";
import { Household } from "../domain/entities/household";
import { AbstractSecurityGuardService } from "../domain/services/isecurity-guard.service";
import { addHousehold, addHouseholdSuccess, getSecurityGuard, getSecurityGuardSuccess, requestKidExit, requestKidExitSuccess, requestVisit, requestVisitSuccess, searchUnit, searchUnitSuccess } from "./security-guard.actions";

@Injectable()
export class SecurityGuardEffects {

    constructor(
        private _actions$: ActionsSubject,
        private _securityGuardService: AbstractSecurityGuardService,
        private _snackBarService: MatSnackBar) { }


    getSecurityGuard$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(getSecurityGuard),
                switchMap(_ => {
                    return this._securityGuardService.getSecurityGuard().
                        pipe(map(securityGuard => getSecurityGuardSuccess({ securityGuard })),
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
                    return this._securityGuardService.addHousehold(d.household).
                        pipe(map(householdId => {
                            const household = new Household(householdId, d.household)
                            return addHouseholdSuccess({ homeOwnerId: d.household.homeOwnerId, household })
                        }),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )


    searchUnit$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(searchUnit),
                switchMap(d => {
                    return this._securityGuardService.searchUnit(d.unit).
                        pipe(map(homeOwners => searchUnitSuccess({ homeOwners })),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )


    requestVisit$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(requestVisit),
                switchMap(d => {
                    const request: RequestVisitRequest = {
                        homeOwnerId: d.homeOwnerId,
                        householdId: d.householdId
                    }
                    return this._securityGuardService.requestVisit(request).
                        pipe(map(_ => requestVisitSuccess()),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )

    requestKidExit$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(requestKidExit),
                switchMap(d => {
                    const request: RequestKidExitRequest = {
                        homeOwnerId: d.homeOwnerId,
                        householdId: d.householdId
                    }
                    return this._securityGuardService.requestKidExit(request).
                        pipe(map(_ => requestKidExitSuccess()),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )

}