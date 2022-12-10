import { Observable } from "rxjs";
import { AddHouseholdRequest } from "../contracts/requests/add-household";
import { AddMessageRequest } from "../contracts/requests/add-message";
import { KidExitRequest } from "../contracts/requests/kid-exit";
import { IMarkPaymentPaidRequest } from "../contracts/requests/mark-payment-paid-request";
import { UpdateLogRequest } from "../contracts/requests/update-log";
import { HomeOwner } from "../entities/home-owner";

export interface IHomeOwnerService {
    getHomeOwner(): Observable<HomeOwner>
    addHousehold(household: AddHouseholdRequest): Observable<string>
    allowKidExit(request: KidExitRequest): Observable<void>
    updateLog(request: UpdateLogRequest): Observable<void>
    addMessage(request: AddMessageRequest): Observable<void>
    markPaymentPaid(request: IMarkPaymentPaidRequest): Observable<void>
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
    abstract markMessageViewed(): Observable<void>
    abstract markNoticeboardViewed(): Observable<void>
    abstract markPaymentViewed(): Observable<void>
}