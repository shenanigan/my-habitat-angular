
import { createAction, props } from "@ngrx/store";
import { AddHouseholdRequest } from "../domain/contracts/requests/add-household";
import { HomeOwner } from "../domain/entities/home-owner";
import { Household } from "../domain/entities/household";

export const getHomeOwner = createAction('[HomeOwner] Get Home Owner')
export const getHomeOwnerSuccess = createAction('[HomeOwner] Get Home Owner Success', props<{ homeOwner: HomeOwner }>())

export const addHousehold = createAction ('[HomeOwner] Add Household', props<{household: AddHouseholdRequest}>())
export const addHouseholdSuccess = createAction ('[HomeOwner] Add Household Success', props<{household: Household}>())