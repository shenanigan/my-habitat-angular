import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { createEffect, ofType } from "@ngrx/effects";
import { ActionsSubject } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { AbstractHomeOwnerService } from "../domain/services/ihome-owner.service";
import { failed, getHomeOwner, getHomeOwnerSuccess } from "./home-owner.actions";

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

}