
import { createAction, props } from "@ngrx/store";
import { Society } from "../domain/entities/society";

export const failed = createAction('[Society] Failed', props<{ error: Error }>())

export const getSociety = createAction('[Society] Get Society', props<{ societyId: string }>())
export const getSocietySuccess = createAction('[Society] Get Society Success', props<{ society: Society }>())