import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { BaseService } from "src/app/shared/infrastructure/api/base.service";
import { Apollo, gql } from "apollo-angular";
import { IHomeOwnerService } from "../../domain/services/ihome-owner.service";
import { HomeOwner } from "../../domain/entities/home-owner";

@Injectable()
export class HomeOwnerService extends BaseService implements IHomeOwnerService {

  constructor(private _apollo: Apollo) {
    super();
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
        var homeOwner = new HomeOwner(res.data.homeOwner.homeOwnerId, res.data.homeOwner);
        return homeOwner
      }))
      .pipe(catchError(this.handleError));
  }
}