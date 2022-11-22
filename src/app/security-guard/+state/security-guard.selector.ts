import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState, securityGuardFeatureName } from "./security-guard.reducer";

const getSecurityGuardModule = createFeatureSelector<IState>(securityGuardFeatureName);

export const selectSecurityGuard = () => createSelector(
    getSecurityGuardModule,
    state => {
        return state.securityGuard
    }
);


export const selectSearchHomeOwners = () => createSelector(
    getSecurityGuardModule,
    state => state.searchHomeOwners
);


export const selectKids = (homeOwnerId: string) => createSelector(
    getSecurityGuardModule,
    state => state.searchHomeOwners.filter(x => x.entityId === homeOwnerId)[0].households.filter(x => x.type === 'FAMILY_KID')
);

export const selectHomeOwner = (homeOwnerId: string) => createSelector(
    getSecurityGuardModule,
    state => state.searchHomeOwners.filter(x => x.entityId === homeOwnerId)[0]
);
