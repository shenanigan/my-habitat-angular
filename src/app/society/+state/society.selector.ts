import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ISocietyState, societyFeatureName } from "./society.reducer";

const getSocietyModule = createFeatureSelector<ISocietyState>(societyFeatureName);

export const selectSociety = () => createSelector(
    getSocietyModule,
    state => {
        return state.society
    }
);
