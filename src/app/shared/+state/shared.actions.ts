import { createAction, props } from "@ngrx/store";
import { Role } from "../domain/role";

export const invalidParams = createAction('[Shared] Inavlid Parameters', (error) => error)
export const failed = createAction('[Shared] Failed', (error) => error)

export const getMetadata = createAction('[Shared] Get Metadata');
export const getMetadataSuccess = createAction('[Shared] Get Metadata Success', props<{ roles: Role[] }>());