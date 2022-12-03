import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { BaseService } from "src/app/shared/infrastructure/api/base.service";
import { Apollo, gql } from "apollo-angular";
import { IHomeOwnerService } from "../../domain/services/ihome-owner.service";
import { HomeOwner } from "../../domain/entities/home-owner";
import { Household } from "../../domain/entities/household";
import { AddHouseholdRequest } from "../../domain/contracts/requests/add-household";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { StorageService } from "src/app/shared/infrastructure/storage/storage.service";
import { KidExitRequest } from "../../domain/contracts/requests/kid-exit";
import { UpdateLogRequest } from "../../domain/contracts/requests/update-log";
import { AddMessageRequest } from "../../domain/contracts/requests/add-message";
import { Message } from "../../domain/entities/message";

@Injectable()
export class HomeOwnerService extends BaseService implements IHomeOwnerService {

  constructor(_storageService: StorageService,
    private _apollo: Apollo,
    private _http: HttpClient) {
    super(_storageService);
  }


  addHousehold(request: AddHouseholdRequest): Observable<string> {
    return this._http.post<Household>(environment.homeOwnerURL + `HomeOwner/AddHousehold`, request, super.headers())
      .pipe(map(response => response.entityId),
        catchError(this.handleError));
  }

  allowKidExit(request: KidExitRequest): Observable<void> {
    return this._http.post<void>(environment.homeOwnerURL + `HomeOwner/AllowKidExit`, request, super.headers())
      .pipe(map(_ => _),
        catchError(this.handleError));
  }

  updateLog(request: UpdateLogRequest): Observable<void> {
    return this._http.post<void>(environment.homeOwnerURL + `HomeOwner/UpdateLog`, request, super.headers())
      .pipe(map(_ => _),
        catchError(this.handleError));
  }

  getHomeOwner(): Observable<HomeOwner> {
    const GET_HOME_OWNER = gql`query GetHomeOwner {
      homeOwner {
        name
        email
        phoneNumber
        countryCode
        homeOwnerId
        home {
          unit
          homeId
          createdAt
        }
        logs{
          entityId: logId
          reason
          status
          isExit
          requestTime
          approvedTime
          rejectedTime
          household {
            name
            role 
            type
            imageUrl
          }
        }
        households {
          name
          type
          phoneNumber
          role
          permission
          countryCode
          entityId: householdId
          imageUrl
        }
        messages{
          text
          type
          sentById
          createdAt
          imageUrl
          messageId
        }
      }
    }`
    return this._apollo
      .query<any>({
        query: GET_HOME_OWNER
      }).pipe(map(res => {
        var homeOwner = new HomeOwner(res.data.homeOwner.homeOwnerId, res.data.homeOwner);
        return homeOwner
      }))
      .pipe(catchError(this.handleError));
  }

  addMessage(request: AddMessageRequest): Observable<void> {
    return this._http.post<void>(environment.homeOwnerURL + `HomeOwner/AddMessage`, request, super.headers())
      .pipe(map(_ => _),
        catchError(this.handleError));
  }
}