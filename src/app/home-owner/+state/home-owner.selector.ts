import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState, homeOwnerFeatureName } from "./home-owner.reducer";

const getHomeOwnerModule = createFeatureSelector<IState>(homeOwnerFeatureName);

export const selectHomeOwner = () => createSelector(
    getHomeOwnerModule,
    state => {
        return state.homeOwner
    }
);

export const selectSociety = () => createSelector(
    getHomeOwnerModule,
    state => {
        return state.homeOwner.society
    }
);


export const selectKids = () => createSelector(
    getHomeOwnerModule,
    state => state.homeOwner.households.filter(x => x.type === 'FAMILY_KID')
);
