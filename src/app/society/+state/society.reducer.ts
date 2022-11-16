import { createReducer, on } from "@ngrx/store";
import { Society } from "../domain/entities/society";
import { failed, getSocietySuccess } from "./society.actions";

export interface ISocietyState {
    society: Society
}

const initialState: ISocietyState = {
    society: new Society()
}

export const societyReducer = createReducer(
    initialState,
    on(getSocietySuccess, (state, { society }) => {
        return {
            ...state,
            society
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
export const societyFeatureName = 'societies'