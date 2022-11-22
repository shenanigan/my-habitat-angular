import { createReducer, on } from "@ngrx/store";
import { failed } from "src/app/shared/+state/shared.actions";
import { HomeOwner } from "../domain/entities/home-owner";
import { SecurityGuard } from "../domain/entities/security-guard";
import { addHouseholdSuccess, getSecurityGuardSuccess, searchUnitSuccess } from "./security-guard.actions";

export interface IState {
    securityGuard: SecurityGuard
    searchHomeOwners: HomeOwner[]
}

const initialState: IState = {
    securityGuard: new SecurityGuard(''),
    searchHomeOwners: []
}

export const securityGuardReducer = createReducer(
    initialState,
    on(getSecurityGuardSuccess, (state, { securityGuard }) => {
        return {
            ...state,
            securityGuard
        }
    }),
    on(searchUnitSuccess, (state, { homeOwners }) => {
        return {
            ...state,
            searchHomeOwners: homeOwners
        }
    }),
    on(addHouseholdSuccess, (state, { household }) => {
        var updatedSecurityGuard = new SecurityGuard(state.securityGuard.entityId, state.securityGuard)
        updatedSecurityGuard.households.push(household);
        return {
            ...state,
            securityGuard: updatedSecurityGuard
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
export const securityGuardFeatureName = 'securityGuard'