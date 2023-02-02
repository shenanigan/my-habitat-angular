import { Observable } from "rxjs";
import { AddHouseholdRequest } from "../contracts/requests/add-household";
import { SecurityGuard } from "../entities/security-guard";
import { Household } from "../entities/household";
import { HomeOwner } from "../entities/home-owner";
import { RequestVisitRequest } from "../contracts/requests/request-visit";
import { RequestKidExitRequest } from "../contracts/requests/request-kid-exit";

export interface ISecurityGuardService {
    getSecurityGuard(): Observable<SecurityGuard>
    addHousehold(household: AddHouseholdRequest): Observable<string>
    searchUnit(unit: string): Observable<HomeOwner[]>
    requestVisit(request: RequestVisitRequest): Observable<string>
    requestKidExit(request: RequestKidExitRequest): Observable<string>

}

export abstract class AbstractSecurityGuardService implements ISecurityGuardService {
    abstract getSecurityGuard(): Observable<SecurityGuard>
    abstract addHousehold(household: AddHouseholdRequest): Observable<string>
    abstract searchUnit(unit: string): Observable<HomeOwner[]>
    abstract requestVisit(request: RequestVisitRequest): Observable<string>
    abstract requestKidExit(request: RequestKidExitRequest): Observable<string>
}