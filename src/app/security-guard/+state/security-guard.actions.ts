
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

export const addHousehold = createAction('[SecurityGuard] Add Household', props<{ household: AddHouseholdRequest }>())
export const addHouseholdSuccess = createAction('[SecurityGuard] Add Household Success', props<{ homeOwnerId: string, household: Household }>())

export const requestVisit = createAction('[SecurityGuard] Request Visit', props<{ homeOwnerId: string, householdId: string }>())
export const requestVisitSuccess = createAction('[SecurityGuard] Request Visit Success')

export const requestKidExit = createAction('[SecurityGuard] Request Kid Exit', props<{ homeOwnerId: string, householdId: string }>())
export const requestKidExitSuccess = createAction('[SecurityGuard] Request Kid Exit Success')

export const allowKidExit = createAction('[SecurityGuard] Allow Kid Exit', props<{ kidExitRequest: KidExitRequest }>())
export const allowKidExitSuccess = createAction('[SecurityGuard]  Allow Kid Exit Success')