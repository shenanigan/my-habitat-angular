import { Observable } from "rxjs";
import { Society } from "../entities/society";

export interface ISocietyService {
    getSociety(societyId: string): Observable<Society>
    getSocietyForHO(): Observable<Society>
}

export abstract class AbstractSocietyService implements ISocietyService {
    abstract getSociety(societyId: string): Observable<Society>
    abstract getSocietyForHO(): Observable<Society>
}