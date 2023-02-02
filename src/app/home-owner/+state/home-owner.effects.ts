import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { createEffect, ofType } from "@ngrx/effects";
import { ActionsSubject } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { failed, success } from "src/app/shared/+state/shared.actions";
import { Household } from "../domain/entities/household";
import { Message } from "../domain/entities/message";
import { Payment } from "../domain/entities/payment";
import { Reservation } from "../domain/entities/reservation";
import { AbstractHomeOwnerService } from "../domain/services/ihome-owner.service";
import { addHousehold, addHouseholdSuccess, addMessage, addMessageSuccess, addReservation, addReservationSuccess, allowKidExit, allowKidExitSuccess, cancelKidExit, cancelKidExitSuccess, cancelReservation, cancelReservationSuccess, editReservation, editReservationSuccess, getHomeOwner, getHomeOwnerSuccess, markMessageViewed, markNoticeboardViewed, markPaymentPaid, markPaymentPaidSuccess, markPaymentViewed, updateLog, updateLogSuccess } from "./home-owner.actions";

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
                        pipe(map(_ => allowKidExitSuccess({ kidExitRequest: d.kidExitRequest })),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )

    cancelKidExit$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(cancelKidExit),
                switchMap(d => {
                    return this._homeOwnerService.cancelKidExit(d.request).
                        pipe(map(_ => cancelKidExitSuccess({ request: d.request })),
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


    markPaymentPaid$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(markPaymentPaid),
                switchMap(d => {
                    return this._homeOwnerService.markPaymentPaid(d.request).
                        pipe(map(_ => {
                            var payment = new Payment(d.request.paymentId, d.request);
                            payment.paymentDate = new Date()
                            payment.status = 'PAID'
                            return markPaymentPaidSuccess({ payment })
                        }),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )


    markMessageViewed$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(markMessageViewed),
                switchMap(_ => {
                    return this._homeOwnerService.markMessageViewed().
                        pipe(map(_ => {
                            return success()
                        }),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )

    markPaymentViewed$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(markPaymentViewed),
                switchMap(_ => {
                    return this._homeOwnerService.markPaymentViewed().
                        pipe(map(_ => {
                            return success()
                        }),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )

    markNoticeboardViewed$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(markNoticeboardViewed),
                switchMap(_ => {
                    return this._homeOwnerService.markNoticeboardViewed().
                        pipe(map(_ => {
                            return success()
                        }),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )



    addReservation$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(addReservation),
                switchMap(d => {
                    return this._homeOwnerService.addReservation(d.reservation).
                        pipe(map(response => {
                            var reservation = new Reservation(response.entityId, d.reservation);
                            return addReservationSuccess({ reservation })
                        }),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )


    editReservation$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(editReservation),
                switchMap(d => {
                    return this._homeOwnerService.editReservation(d.reservation).
                        pipe(map(_ => {
                            var reservation = new Reservation(d.reservation.reservationId, d.reservation);
                            return editReservationSuccess({ reservation })
                        }),
                            catchError(err => {
                                this._snackBarService.open(err.message, 'CANCEL');
                                return of(failed(err))
                            })
                        )
                })
            )
        )

    cancelReservation$ =
        createEffect(() =>
            this._actions$.pipe(
                ofType(cancelReservation),
                switchMap(d => {
                    return this._homeOwnerService.cancelReservation(d.reservation).
                        pipe(map(_ => {
                            var reservation = new Reservation(d.reservation.reservationId, d.reservation);
                            return cancelReservationSuccess({ reservation })
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