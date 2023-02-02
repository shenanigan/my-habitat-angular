import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { createEffect, ofType } from "@ngrx/effects";
import { ActionsSubject } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { AbstractSocietyService } from "../domain/services/isociety.service";
import { failed, getSociety, getSocietyForHO, getSocietySuccess } from "./society.actions";

@Injectable()
export class NoticeboardEffects {

    constructor(
        private _actions$: ActionsSubject,
        private _societyService: AbstractSocietyService,
        private _snackBarService: MatSnackBar) { }


    getSociety$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(getSociety),
                switchMap(d => {
                    return this._societyService.getSociety(d.societyId).
                        pipe(map(society => getSocietySuccess({ society })),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )

    getSocietyForHO$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(getSocietyForHO),
                switchMap(d => {
                    return this._societyService.getSocietyForHO().
                        pipe(map(society => getSocietySuccess({ society })),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )

}