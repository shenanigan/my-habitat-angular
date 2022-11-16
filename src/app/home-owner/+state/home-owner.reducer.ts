import { createReducer, on } from "@ngrx/store";
import { HomeOwner } from "../domain/entities/home-owner";
import { failed, getHomeOwnerSuccess } from "./home-owner.actions";

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