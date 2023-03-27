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
import { IMarkPaymentPaidRequest } from "../../domain/contracts/requests/mark-payment-paid-request";
import { Society } from "../../domain/entities/society";
import { IAddReservation } from "../../domain/contracts/requests/add-reservation";
import { IEditReservation } from "../../domain/contracts/requests/edit-reservation";
import { ICancelReservation } from "../../domain/contracts/requests/cancel-reservation";
import { IAddEntity } from "../../domain/contracts/responses/add";
import { CancelKidExitRequest } from "../../domain/contracts/requests/cancel-kid-exit";
import { UpdateHouseholdRequest } from "../../domain/contracts/requests/update-household";
import { RemoveHouseholdRequest } from "../../domain/contracts/requests/remove-household";
import { UpdateHomeOwnerRequest } from "../../domain/contracts/requests/update-homeOwner";


@Injectable()
export class HomeOwnerService extends BaseService implements IHomeOwnerService {

  constructor(_storageService: StorageService,
    private _apollo: Apollo,
    private _http: HttpClient) {
    super(_storageService);
  }

  updateHomeOwner(request: UpdateHomeOwnerRequest): Observable<string> {
    return this._http.post<HomeOwner>(environment.homeOwnerURL + `HomeOwner/UpdateProfile`, request, super.headers())
      .pipe(map(response => response.entityId),
        catchError(this.handleError));
  }

  addHousehold(request: AddHouseholdRequest): Observable<string> {
    return this._http.post<Household>(environment.homeOwnerURL + `HomeOwner/AddHousehold`, request, super.headers())
      .pipe(map(response => response.entityId),
        catchError(this.handleError));
  }

  updateHousehold(request: UpdateHouseholdRequest): Observable<string> {
    return this._http.post<Household>(environment.homeOwnerURL + `HomeOwner/UpdateHousehold`, request, super.headers())
      .pipe(map(response => response.entityId),
        catchError(this.handleError));
  }

  removeHousehold(request: RemoveHouseholdRequest): Observable<string> {
    return this._http.post<Household>(environment.homeOwnerURL + `HomeOwner/RemoveHousehold`, request, super.headers())
      .pipe(map(response => response.entityId),
        catchError(this.handleError));
  }

  allowKidExit(request: KidExitRequest): Observable<void> {
    return this._http.post<void>(environment.homeOwnerURL + `HomeOwner/AllowKidExit`, request, super.headers())
      .pipe(map(_ => _),
        catchError(this.handleError));
  }

  cancelKidExit(request: CancelKidExitRequest): Observable<void> {
    return this._http.post<void>(environment.homeOwnerURL + `HomeOwner/CancelKidExit`, request, super.headers())
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
        hasViewedNoticeboard
        hasViewedPayments
        hasViewedMessages {
          key
          value
        }
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
          allowedStartTime
          allowedEndTime
        }
        messages{
          text
          type
          sentById
          createdAt
          imageUrl
          entityId: messageId
        }
        
        payments {
          entityId: paymentId
          createdAt
          paymentDate
          dueDate
          type
          amount
          currency
          orderId
          status
        }

        reservations{
          startDateTime
          endDateTime
          amenity
          createdAt
          entityId: reservationId
        }
      }


        society {
          entityId: societyId
          name
          address
          city
          state
          country
          amenities {
            isActive
            name
            slotDuration
            startDateTime
            endDateTime
            icon
          }
          reservations {
            key
            value {
              key
              value {
                entityId: reservationId
                startDateTime
                endDateTime
                createdAt
                amenity
              }
            }
          }
        }
      
    }`
    return this._apollo
      .query<any>({
        query: GET_HOME_OWNER
      }).pipe(map(res => {
        var homeOwner = new HomeOwner(res.data.homeOwner.homeOwnerId, res.data.homeOwner);
        var society = new Society(res.data.society.entityId, res.data.society);
        homeOwner.society = society;
        return homeOwner
      }))
      .pipe(catchError(this.handleError));
  }

  addMessage(request: AddMessageRequest): Observable<void> {
    return this._http.post<void>(environment.homeOwnerURL + `HomeOwner/AddMessage`, request, super.headers())
      .pipe(map(_ => _),
        catchError(this.handleError));
  }

  addReservation(request: IAddReservation): Observable<IAddEntity> {
    return this._http.post<IAddEntity>(environment.homeOwnerURL + `Societies/AddReservation`, request, super.headers())
      .pipe(map(res => res),
        catchError(this.handleError));
  }

  editReservation(request: IEditReservation): Observable<void> {
    return this._http.post<void>(environment.homeOwnerURL + `Societies/EditReservation`, request, super.headers())
      .pipe(map(_ => _),
        catchError(this.handleError));
  }

  cancelReservation(request: ICancelReservation): Observable<void> {
    return this._http.post<void>(environment.homeOwnerURL + `Societies/CancelReservation`, request, super.headers())
      .pipe(map(_ => _),
        catchError(this.handleError));
  }

  markPaymentPaid(request: IMarkPaymentPaidRequest): Observable<void> {
    return this._http.post<void>(environment.homeOwnerURL + `HomeOwner/MarkPaymentPaid`, request, super.headers())
      .pipe(map(_ => _),
        catchError(this.handleError));
  }

  markMessageViewed(): Observable<void> {
    return this._http.post<void>(environment.homeOwnerURL + `HomeOwner/MarkMessageViewed`, {}, super.headers())
      .pipe(map(_ => _),
        catchError(this.handleError));
  }

  markNoticeboardViewed(): Observable<void> {
    return this._http.post<void>(environment.homeOwnerURL + `HomeOwner/MarkNoticeboardViewed`, {}, super.headers())
      .pipe(map(_ => _),
        catchError(this.handleError));
  }

  markPaymentViewed(): Observable<void> {
    return this._http.post<void>(environment.homeOwnerURL + `HomeOwner/MarkPaymentViewed`, {}, super.headers())
      .pipe(map(_ => _),
        catchError(this.handleError));
  }
}