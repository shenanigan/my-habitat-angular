
import { createAction, props } from "@ngrx/store";
import { AddHouseholdRequest } from "../domain/contracts/requests/add-household";
import { KidExitRequest } from "../domain/contracts/requests/kid-exit";
import { SecurityGuard } from "../domain/entities/security-guard";
import { HomeOwner } from "../domain/entities/home-owner";
import { Household } from "../domain/entities/household";

export const getSecurityGuard = createAction('[SecurityGuard] Get Home Owner')
export const getSecurityGuardSuccess = createAction('[SecurityGuard] Get Home Owner Success', props<{ securityGuard: SecurityGuard }>())

export const searchUnit = createAction('[SecurityGuard] Search Unit', props<{ unit: string }>())
export const searchUnitSuccess = createAction('[SecurityGuard] Search Unit Success', props<{ homeOwners: HomeOwner[] }>())

export const addHousehold = createAction('[HomeOwner] Add Household', props<{ household: AddHouseholdRequest }>())
export const addHouseholdSuccess = createAction('[HomeOwner] Add Household Success', props<{ household: Household }>())

export const allowKidExit = createAction('[SecurityGuard] Allow Kid Exit', props<{ kidExitRequest: KidExitRequest }>())
export const allowKidExitSuccess = createAction('[SecurityGuard]  Allow Kid Exit Success')