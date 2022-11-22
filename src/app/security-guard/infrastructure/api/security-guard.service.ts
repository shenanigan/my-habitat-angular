import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { BaseService } from "src/app/shared/infrastructure/api/base.service";
import { Apollo, gql } from "apollo-angular";
import { ISecurityGuardService } from "../../domain/services/isecurity-guard.service";
import { SecurityGuard } from "../../domain/entities/security-guard";
import { Household } from "../../domain/entities/household";
import { AddHouseholdRequest } from "../../domain/contracts/requests/add-household";
import { HomeOwner } from "../../domain/entities/home-owner";

@Injectable()
export class SecurityGuardService extends BaseService implements ISecurityGuardService {

  constructor(private _apollo: Apollo) {
    super();
  }

  addHousehold(household: AddHouseholdRequest): Observable<Household> {
    throw new Error("Method not implemented.");
  }
  searchUnit(unit: string): Observable<HomeOwner[]> {
    throw new Error("Method not implemented.");
  }
  getSecurityGuard(): Observable<SecurityGuard> {
    const GET_HOME_OWNER = gql`query GetSecurityGuard {
      securityGuard {
        name
        email
        phoneNumber
        countryCode
        securityGuardId
        home {
          unit
          homeId
          createdAt
        }
        households {
          name
          type
          phoneNumber
          role
          permission
          countryCode
          householdId
        }
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