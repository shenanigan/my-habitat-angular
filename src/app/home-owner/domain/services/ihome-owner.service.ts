import { Observable } from "rxjs";
import { AddHouseholdRequest } from "../contracts/requests/add-household";
import { AddMessageRequest } from "../contracts/requests/add-message";
import { IAddReservation } from "../contracts/requests/add-reservation";
import { ICancelReservation } from "../contracts/requests/cancel-reservation";
import { IEditReservation } from "../contracts/requests/edit-reservation";
import { KidExitRequest } from "../contracts/requests/kid-exit";
import { IMarkPaymentPaidRequest } from "../contracts/requests/mark-payment-paid-request";
import { UpdateLogRequest } from "../contracts/requests/update-log";
import { IAddEntity } from "../contracts/responses/add";
import { HomeOwner } from "../entities/home-owner";

export interface IHomeOwnerService {
    getHomeOwner(): Observable<HomeOwner>
    addHousehold(household: AddHouseholdRequest): Observable<string>
    allowKidExit(request: KidExitRequest): Observable<void>
    updateLog(request: UpdateLogRequest): Observable<void>
    addMessage(request: AddMessageRequest): Observable<void>
    markPaymentPaid(request: IMarkPaymentPaidRequest): Observable<void>
    addReservation(request: IAddReservation): Observable<IAddEntity>
    editReservation(request: IEditReservation): Observable<void>
    cancelReservation(request: ICancelReservation): Observable<void>
    markMessageViewed(): Observable<void>
    markPaymentViewed(): Observable<void>
    markNoticeboardViewed(): Observable<void>
}

export abstract class AbstractHomeOwnerService implements IHomeOwnerService {
    abstract getHomeOwner(): Observable<HomeOwner>
    abstract addHousehold(household: AddHouseholdRequest): Observable<string>
    abstract allowKidExit(request: KidExitRequest): Observable<void>
    abstract updateLog(request: UpdateLogRequest): Observable<void>
    abstract addMessage(request: AddMessageRequest): Observable<void>
    abstract markPaymentPaid(request: IMarkPaymentPaidRequest): Observable<void>
    abstract addReservation(request: IAddReservation): Observable<IAddEntity>
    abstract editReservation(request: IEditReservation): Observable<void>
    abstract cancelReservation(request: ICancelReservation): Observable<void>
    abstract markMessageViewed(): Observable<void>
    abstract markNoticeboardViewed(): Observable<void>
    abstract markPaymentViewed(): Observable<void>
}