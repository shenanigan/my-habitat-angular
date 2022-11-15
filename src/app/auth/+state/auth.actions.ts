
import { createAction, props } from "@ngrx/store";
import { Token } from "../domain/entities/token";

export const failed = createAction('[Auth] Failed', props<{ error: Error }>())

export const sendOtp = createAction('[Auth] Send Otp', props<{ countryCode: number, phoneNumber: string }>())
export const sendOtpSuccess = createAction('[Auth] Send Otp Success')

export const verifyOtp = createAction('[Auth] Verify Otp', props<{ countryCode: number, phoneNumber: string, otp: string }>())
export const verifyOtpSuccess = createAction('[Auth] Verify Otp Success', props<{ token: Token }>())