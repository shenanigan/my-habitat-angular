import { createReducer, on } from "@ngrx/store";
import { failed, messageRecieved, noticeAdded, paymentRequested } from "src/app/shared/+state/shared.actions";
import { HomeOwner } from "../domain/entities/home-owner";
import { Message } from "../domain/entities/message";
import { Payment } from "../domain/entities/payment";
import { Reservation } from "../domain/entities/reservation";
import { addHouseholdSuccess, addMessage, addReservationSuccess, getHomeOwnerSuccess, markPaymentPaidSuccess, updateLogSuccess } from "./home-owner.actions";

export interface IState {
    homeOwner: HomeOwner
}

const initialState: IState = {
    homeOwner: new HomeOwner('')
}

export const homeOwnerReducer = createReducer(
    initialState,
    on(getHomeOwnerSuccess, (state, { homeOwner }) => {
        return {
            ...state,
            homeOwner
        }
    }),
    on(addHouseholdSuccess, (state, { household }) => {
        var updatedHomeOwner = new HomeOwner(state.homeOwner.entityId, state.homeOwner)
        updatedHomeOwner.households.push(household);
        return {
            ...state,
            homeOwner: updatedHomeOwner
        }
    }),
    on(updateLogSuccess, (state, { logId, shouldApprove }) => {
        var updatedHomeOwner = new HomeOwner(state.homeOwner.entityId, state.homeOwner)
        var logs = updatedHomeOwner.logs.filter(x => x.entityId === logId)
        if (logs.length > 0) {
            var log = logs[0]
            log.status = shouldApprove ? 'APPROVED' : 'REJECTED'
            if (shouldApprove) {
                log.approvedTime = new Date()
            } else {
                log.rejectedTime = new Date()
            }
        }
        return {
            ...state,
            homeOwner: updatedHomeOwner
        }
    }),
    on(addMessage, (state, { homeOwnerId, request }) => {

        var updatedHomeOwner = new HomeOwner(state.homeOwner.entityId, state.homeOwner)
        var message = new Message('_', request)
        message.createdAt = new Date();
        message.sentById = updatedHomeOwner.entityId;
        updatedHomeOwner.messages.push(message);
        return {
            ...state,
            homeOwner: updatedHomeOwner
        }
    }),
    on(messageRecieved, (state, { message }) => {
        var updatedHomeOwner = new HomeOwner(state.homeOwner.entityId, state.homeOwner)
        var newMessage = new Message(message.entityId, message);
        updatedHomeOwner.messages.push(newMessage);
        updatedHomeOwner.hasViewedMessages = []

        return {
            ...state,
            homeOwner: updatedHomeOwner
        }
    }),
    on(paymentRequested, (state, { payment }) => {
        var updatedHomeOwner = new HomeOwner(state.homeOwner.entityId, state.homeOwner)
        var newPayment = new Payment(payment.entityId, payment);
        updatedHomeOwner.payments.push(newPayment);
        updatedHomeOwner.hasViewedPayments = false;

        return {
            ...state,
            homeOwner: updatedHomeOwner
        }
    }),
    on(noticeAdded, (state, { notice }) => {
        var updatedHomeOwner = new HomeOwner(state.homeOwner.entityId, state.homeOwner)
        updatedHomeOwner.hasViewedNoticeboard = false;

        return {
            ...state,
            homeOwner: updatedHomeOwner
        }
    }),
    on(markPaymentPaidSuccess, (state, { payment }) => {

        var updatedHomeOwner = new HomeOwner(state.homeOwner.entityId, state.homeOwner)
        var payments = updatedHomeOwner.payments.filter(x => x.entityId === payment.entityId)
        if (payments.length > 0) {
            var storedPayment = payments[0]
            Object.assign(storedPayment, payment)
        }
        return {
            ...state,
            homeOwner: updatedHomeOwner
        }
    }),
    on(addReservationSuccess, (state, { reservation }) => {

        var updatedHomeOwner = new HomeOwner(state.homeOwner.entityId, state.homeOwner)
        var reservation = new Reservation('_', reservation)
        updatedHomeOwner.reservations.push(reservation);
        return {
            ...state,
            homeOwner: updatedHomeOwner
        }
    }),
    on(failed, (state, { error }) => ({
        ...state,
        errorMessage: error.message,
        isLoaded: false
    }))
)


/**
 * DONT' ALTER THE NAME BELOW. 
 * IT SHOULD BE SAME AS THE  NAME OF THE VARIABLE IN IUserState
 * */
export const homeOwnerFeatureName = 'homeOwner'