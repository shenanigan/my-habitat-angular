import { Observable } from "rxjs";
import { AddHouseholdRequest } from "../contracts/requests/add-household";
import { HomeOwner } from "../entities/home-owner";

export interface IHomeOwnerService {
    getHomeOwner(): Observable<HomeOwner>
    addHousehold(household: AddHouseholdRequest): Observable<string>
}

export abstract class AbstractHomeOwnerService implements IHomeOwnerService {
    abstract getHomeOwner(): Observable<HomeOwner>
    abstract addHousehold(household: AddHouseholdRequest): Observable<string>
}