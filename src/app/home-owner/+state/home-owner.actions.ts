
import { createAction, props } from "@ngrx/store";
import { HomeOwner } from "../domain/entities/home-owner";

export const failed = createAction('[HomeOwner] Failed', props<{ error: Error }>())

export const getHomeOwner = createAction('[HomeOwner] Get Home Owner')
export const getHomeOwnerSuccess = createAction('[HomeOwner] Get Home Owner Success', props<{ homeOwner: HomeOwner }>())