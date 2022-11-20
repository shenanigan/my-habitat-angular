import { createReducer, on } from "@ngrx/store";
import { failed } from "src/app/shared/+state/shared.actions";
import { HomeOwner } from "../domain/entities/home-owner";
import { addHouseholdSuccess, getHomeOwnerSuccess } from "./home-owner.actions";

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