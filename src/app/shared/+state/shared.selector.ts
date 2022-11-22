import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IMetadataState, sharedFeatureName } from "./shared.reducer";

const getMetadataModule = createFeatureSelector<IMetadataState>(sharedFeatureName);

export const selectFamilyAdultRoles = () => createSelector(
    getMetadataModule,
    state => state.roles.filter(x => x.type === 'FAMILY_ADULT')
);

export const selectFamilyKidRoles = () => createSelector(
    getMetadataModule,
    state => state.roles.filter(x => x.type === 'FAMILY_KID')
);

export const selectFrequentVisitorRoles = () => createSelector(
    getMetadataModule,
    state => state.roles.filter(x => x.type === 'FREQUENT_VISITOR')
);

export const selectDailyHelpRoles = () => createSelector(
    getMetadataModule,
    state => state.roles.filter(x => x.type === 'DAILY_HELP')
);


export const selectVisitorRoles = () => createSelector(
    getMetadataModule,
    state => state.roles.filter(x => x.type === 'VISITOR')
);
