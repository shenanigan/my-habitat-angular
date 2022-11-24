import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { BaseService } from "src/app/shared/infrastructure/api/base.service";
import { Apollo, gql } from "apollo-angular";
import { ISecurityGuardService } from "../../domain/services/isecurity-guard.service";
import { SecurityGuard } from "../../domain/entities/security-guard";
import { Household } from "../../domain/entities/household";
import { AddHouseholdRequest } from "../../domain/contracts/requests/add-household";
import { HomeOwner } from "../../domain/entities/home-owner";
import { StorageService } from "src/app/shared/infrastructure/storage/storage.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { RequestVisitRequest } from "../../domain/contracts/requests/request-visit";
import { RequestKidExitRequest } from "../../domain/contracts/requests/request-kid-exit";

@Injectable()
export class SecurityGuardService extends BaseService implements ISecurityGuardService {

  constructor(private _apollo: Apollo, _storageService: StorageService,
    private _http: HttpClient) {
    super(_storageService);
  }

  addHousehold(request: AddHouseholdRequest): Observable<string> {
    return this._http.post<Household>(environment.homeOwnerURL + `SecurityGuard/AddHousehold`, request, super.headers())
      .pipe(map(response => response.entityId),
        catchError(this.handleError));
  }

  requestVisit(request: RequestVisitRequest): Observable<void> {
    return this._http.post<void>(environment.homeOwnerURL + `SecurityGuard/RequestVisit`, request, super.headers())
      .pipe(map(_ => _),
        catchError(this.handleError));
  }

  requestKidExit(request: RequestKidExitRequest): Observable<void> {
    return this._http.post<void>(environment.homeOwnerURL + `SecurityGuard/RequestKidExit`, request, super.headers())
      .pipe(map(_ => _),
        catchError(this.handleError));
  }
  searchUnit(unit: string): Observable<HomeOwner[]> {
    const SEARCH_UNIT = gql`query SearchUnit($unit: String!) {
      searchHomeOwners {
        societyId
        homeOwnerId
        name
        home(where: { unit: { contains: $unit } }) {
          unit
        }
        households{
          entityId: householdId
          name
          type
          role
          permission
        }
      }
    }`

    return this._apollo
      .query<any>({
        query: SEARCH_UNIT,
        variables: { unit }
      }).pipe(map(res => {
        return res.data.searchHomeOwners.map((x: any) => new HomeOwner(x.homeOwnerId, x));
      }))
      .pipe(catchError(this.handleError));
  }

  getSecurityGuard(): Observable<SecurityGuard> {
    const GET_HOME_OWNER = gql`query GetSecurityGuard {
      securityGuard {
        name
        email
        phoneNumber
        countryCode
        securityGuardId
      }
    }`
    return this._apollo
      .watchQuery<any>({
        query: GET_HOME_OWNER
      }).valueChanges.pipe(map(res => {
        var securityGuard = new SecurityGuard(res.data.securityGuard.securityGuardId, res.data.securityGuard);
        return securityGuard
      }))
      .pipe(catchError(this.handleError));
  }
}