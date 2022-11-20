import { createReducer, on } from "@ngrx/store";
import { Role } from "../domain/role";
import { failed, getMetadataSuccess } from "./shared.actions";

export interface IMetadataState {
    roles: Role[]
}

export const initialState: IMetadataState = {
    roles: [
        new Role('Wife', 'FAMILY_ADULT'),
        new Role('Father', 'FAMILY_ADULT'),
        new Role('Mother', 'FAMILY_ADULT'),
        new Role('Daughter', 'FAMILY_ADULT'),
        new Role('Son', 'FAMILY_ADULT'),
        new Role('Daughter', 'FAMILY_KID'),
        new Role('Son', 'FAMILY_KID'),
        new Role('Maid', 'DAILY_HELP'),
        new Role('Driver', 'DAILY_HELP'),
        new Role('Cook', 'DAILY_HELP'),
        new Role('Nanny', 'DAILY_HELP'),
        new Role('Car Cleaner', 'DAILY_HELP'),
        new Role('House Cleaning', 'DAILY_HELP'),
        new Role('Laundry', 'DAILY_HELP'),
        new Role('Physiotherapist', 'DAILY_HELP'),
        new Role('Flower Delivery', 'DAILY_HELP'),
        new Role('Gardner', 'DAILY_HELP'),
        new Role('Friend', 'FREQUENT_VISITOR'),
        new Role('Colleague', 'FREQUENT_VISITOR'),
        new Role('Relative', 'FREQUENT_VISITOR'),
        new Role('Guest', 'FREQUENT_VISITOR')
    ]
}

export const sharedReducer = createReducer(
    initialState,
    on(getMetadataSuccess, (state, { roles }) => {
        return {
            ...state,
            roles
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
 * IT SHOULD BE SAME AS THE  NAME OF THE VARIABLE IN IMetadataState
 * */
export const sharedFeatureName = 'shared'