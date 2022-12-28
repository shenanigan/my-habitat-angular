import { createAction, props } from "@ngrx/store";
import { IMessage } from "../domain/abstractions/imessage";
import { INotice } from "../domain/abstractions/inotice";
import { IPayment } from "../domain/abstractions/ipayment";
import { Role } from "../domain/role";

export const invalidParams = createAction('[Shared] Inavlid Parameters', (error) => error)
export const failed = createAction('[Shared] Failed', (error) => error)
export const success = createAction('[Shared] Success')

export const getMetadata = createAction('[Shared] Get Metadata');
export const getMetadataSuccess = createAction('[Shared] Get Metadata Success', props<{ roles: Role[] }>());

export const messageRecieved = createAction('[Shared] Message Received', props<{ message: IMessage }>())
export const paymentRequested = createAction('[Shared] Payment Requested', props<{ payment: IPayment }>())
export const noticeAdded = createAction('[Shared] NoticeAdded', props<{ notice: INotice }>())

// This should be dispatched when a new reservation is added by calendly.
export const reservationAdded = createAction('[Shared] Reservation Added')