import { Observable } from "rxjs";
import { HomeOwner } from "../entities/home-owner";

export interface IHomeOwnerService {
    getHomeOwner(): Observable<HomeOwner>
}

export abstract class AbstractHomeOwnerService implements IHomeOwnerService {
    abstract getHomeOwner(): Observable<HomeOwner>
}