import { Observable } from "rxjs";
import { ISendOtpRequest } from "../contracts/requests/send-otp-request";
import { IVerifyOtpRequest } from "../contracts/requests/verify-otp-request";
import { Token } from "../entities/token";

export interface IAuthService {
    sendOtp(request: ISendOtpRequest): Observable<void>
    verifyOtp(request: IVerifyOtpRequest): Observable<Token>
}

export abstract class AbstractAuthService implements IAuthService {
    abstract sendOtp(request: ISendOtpRequest): Observable<void>
    abstract verifyOtp(request: IVerifyOtpRequest): Observable<Token>
}