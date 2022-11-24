import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { BaseService } from "src/app/shared/infrastructure/api/base.service";
import { Apollo, gql, Subscription } from "apollo-angular";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { IAuthService } from "../../domain/services/iauth.service";
import { ISendOtpRequest } from "../../domain/contracts/requests/send-otp-request";
import { IVerifyOtpRequest } from "../../domain/contracts/requests/verify-otp-request";
import { Token } from "../../domain/entities/token";
import { StorageService } from "src/app/shared/infrastructure/storage/storage.service";

@Injectable()
export class AuthService extends BaseService implements IAuthService {

  constructor(private _http: HttpClient, _storageService: StorageService) {
    super(_storageService);
  }
  sendOtp(request: ISendOtpRequest): Observable<void> {
    return this._http.post<any>(environment.authURL + `users/sendOtp`, request, super.headers())
      .pipe(map(_ => { }),
        catchError(this.handleError));
  }
  verifyOtp(request: IVerifyOtpRequest): Observable<Token> {
    return this._http.post<Token>(environment.authURL + `users/verifyOtp`, request, super.headers())
      .pipe(map(response => {
        return new Token(response);
      }),
        catchError(this.handleError));
  }


}