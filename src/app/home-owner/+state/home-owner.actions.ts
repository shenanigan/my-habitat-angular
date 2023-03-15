
import { createAction, props } from "@ngrx/store";
import { AddHouseholdRequest } from "../domain/contracts/requests/add-household";
import { AddMessageRequest } from "../domain/contracts/requests/add-message";
import { IAddReservation } from "../domain/contracts/requests/add-reservation";
import { CancelKidExitRequest } from "../domain/contracts/requests/cancel-kid-exit";
import { ICancelReservation } from "../domain/contracts/requests/cancel-reservation";
import { IEditReservation } from "../domain/contracts/requests/edit-reservation";
import { KidExitRequest } from "../domain/contracts/requests/kid-exit";
import { IMarkPaymentPaidRequest } from "../domain/contracts/requests/mark-payment-paid-request";
import {  RemoveHouseholdRequest } from "../domain/contracts/requests/remove-household";
import { UpdateHouseholdRequest } from "../domain/contracts/requests/update-household";
import { UpdateLogRequest } from "../domain/contracts/requests/update-log";
import { HomeOwner } from "../domain/entities/home-owner";
import { Household } from "../domain/entities/household";
import { Message } from "../domain/entities/message";
import { Payment } from "../domain/entities/payment";
import { Reservation } from "../domain/entities/reservation";

export const getHomeOwner = createAction('[HomeOwner] Get Home Owner')
export const getHomeOwnerSuccess = createAction('[HomeOwner] Get Home Owner Success', props<{ homeOwner: HomeOwner }>())

export const addHousehold = createAction('[HomeOwner] Add Household', props<{ household: AddHouseholdRequest }>())
export const addHouseholdSuccess = createAction('[HomeOwner] Add Household Success', props<{ household: Household }>())

export const updateHousehold = createAction('[HomeOwner] Update Household', props<{ household: UpdateHouseholdRequest }>())
export const UpdateHouseholdSuccess = createAction('[HomeOwner] Update Household Success', props<{ household: Household }>())

export const removeHousehold = createAction('[HomeOwner] Remove Household', props<{ household: RemoveHouseholdRequest }>())
export const RemoveHouseholdSuccess = createAction('[HomeOwner] Remove Household Success', props<{ household: Household }>())

export const allowKidExit = createAction('[HomeOwner] Allow Kid Exit', props<{ kidExitRequest: KidExitRequest }>())
export const allowKidExitSuccess = createAction('[HomeOwner]  Allow Kid Exit Success', props<{ kidExitRequest: KidExitRequest }>())

export const cancelKidExit = createAction('[HomeOwner] Cancel Kid Exit', props<{ request: CancelKidExitRequest }>())
export const cancelKidExitSuccess = createAction('[HomeOwner]  Cancel Kid Exit Success', props<{ request: CancelKidExitRequest }>())

export const updateLog = createAction('[HomeOwner] Update Log', props<{ request: UpdateLogRequest }>())
export const updateLogSuccess = createAction('[HomeOwner]  Update Log Success', props<{ logId: string, shouldApprove: boolean }>())

export const addMessage = createAction('[HomeOwner] Add Message', props<{ homeOwnerId: string, request: AddMessageRequest }>())
export const addMessageSuccess = createAction('[HomeOwner]  Add Message Success', props<{ message: Message }>())

export const markPaymentPaid = createAction('[HomeOwner] Mark Payment Paid', props<{ request: IMarkPaymentPaidRequest }>())
export const markPaymentPaidSuccess = createAction('[HomeOwner]  Mark Payment Paid success', props<{ payment: Payment }>())

export const addReservation = createAction('[HomeOwner] Add Reservation', props<{ reservation: IAddReservation }>())
export const addReservationSuccess = createAction('[HomeOwner]  Add Reservation Success', props<{ reservation: Reservation }>())

export const editReservation = createAction('[HomeOwner] Edit Reservation', props<{ reservation: IEditReservation }>())
export const editReservationSuccess = createAction('[HomeOwner]  Edit Reservation Success', props<{ reservation: Reservation }>())

export const cancelReservation = createAction('[HomeOwner] Cancel Reservation', props<{ reservation: ICancelReservation }>())
export const cancelReservationSuccess = createAction('[HomeOwner]  Cancel Reservation Success', props<{ reservation: Reservation }>())

export const markMessageViewed = createAction('[HomeOwner] Mark Message Viewed')
export const markPaymentViewed = createAction('[HomeOwner] Mark Payment Viewed')
export const markNoticeboardViewed = createAction('[HomeOwner] Mark Noticeboard Viewed')