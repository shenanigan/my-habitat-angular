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
import { subscribe } from "graphql";
import { StorageService } from "src/app/shared/infrastructure/storage/storage.service";

@Injectable()
export class MockAuthService extends BaseService implements IAuthService {

  constructor(_storageService: StorageService) {
    super(_storageService);
  }
  sendOtp(request: ISendOtpRequest): Observable<void> {
    return new Observable(subscriber => {
      subscriber.next()
      subscriber.complete()
    });
  }
  verifyOtp(request: IVerifyOtpRequest): Observable<Token> {
    return new Observable(subscriber => {
      var token = new Token()
      token.refreshToken = ''
      token.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJIb21lT3duZXIiLCJTb2NpZXR5SWQiOiI0ZmFmMTdjMy1jOWQ0LTQxNmEtYWU3Mi0zYzVkZjk5YjE3NDQiLCJ1c2VySWQiOiIxN2JkNjExNi02MzE4LTRlNjItYTQ1Zi03NWFjODhkYzIzZjMiLCJleHAiOjE5Mjc3MjgwNjYsImlzcyI6Imh0dHBzOi8vbXloYWJpdGF0LmNvbSIsImF1ZCI6Imh0dHBzOi8vbXloYWJpdGF0LmNvbSJ9.AJ45F25olcBiK9s7uYvr_KnUSt1wBygKnYy-pdGzeME'
      token.validity = new Date()
      subscriber.next(token)
      subscriber.complete()
    });
  }


}