
import { createAction, props } from "@ngrx/store";
import { AddHouseholdRequest } from "../domain/contracts/requests/add-household";
import { KidExitRequest } from "../domain/contracts/requests/kid-exit";
import { HomeOwner } from "../domain/entities/home-owner";
import { Household } from "../domain/entities/household";

export const getHomeOwner = createAction('[HomeOwner] Get Home Owner')
export const getHomeOwnerSuccess = createAction('[HomeOwner] Get Home Owner Success', props<{ homeOwner: HomeOwner }>())

export const addHousehold = createAction('[HomeOwner] Add Household', props<{ household: AddHouseholdRequest }>())
export const addHouseholdSuccess = createAction('[HomeOwner] Add Household Success', props<{ household: Household }>())

export const allowKidExit = createAction('[HomeOwner] Allow Kid Exit', props<{ kidExitRequest: KidExitRequest }>())
export const allowKidExitSuccess = createAction('[HomeOwner]  Allow Kid Exit Success')