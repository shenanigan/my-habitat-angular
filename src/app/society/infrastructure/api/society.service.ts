import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { BaseService } from "src/app/shared/infrastructure/api/base.service";
import { Apollo, gql } from "apollo-angular";
import { ISocietyService } from "../../domain/services/isociety.service";
import { Society } from "../../domain/entities/society";

@Injectable()
export class SocietyService extends BaseService implements ISocietyService {

  constructor(private _apollo: Apollo) {
    super();
  }
  getSociety(societyId: string): Observable<Society> {
    const GET_SOCIETY = gql`query GetSociety($societyId: String!) {
      society(societyId: $societyId) {
        societyId
        name
        address
        city
        state
        country
        notices {
          noticeId
          text
          createdAt
        }
      }
    }`
    return this._apollo
      .watchQuery<any>({
        query: GET_SOCIETY,
        variables: { societyId }
      }).valueChanges.pipe(map(res => {
        var society = new Society(res.data.society);
        return society
      }))
      .pipe(catchError(this.handleError));
  }
}