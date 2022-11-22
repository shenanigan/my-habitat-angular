import { Observable } from "rxjs";
import { AddHouseholdRequest } from "../contracts/requests/add-household";
import { SecurityGuard } from "../entities/security-guard";
import { Household } from "../entities/household";
import { HomeOwner } from "../entities/home-owner";

export interface ISecurityGuardService {
    getSecurityGuard(): Observable<SecurityGuard>
    addHousehold(household: AddHouseholdRequest): Observable<Household>
    searchUnit(unit: string): Observable<HomeOwner[]>
}

export abstract class AbstractSecurityGuardService implements ISecurityGuardService {
    abstract getSecurityGuard(): Observable<SecurityGuard>
    abstract addHousehold(household: AddHouseholdRequest): Observable<Household>
    abstract searchUnit(unit: string): Observable<HomeOwner[]>
}