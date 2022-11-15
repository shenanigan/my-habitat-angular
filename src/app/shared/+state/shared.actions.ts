import { createAction } from "@ngrx/store";

export const invalidParams = createAction('[Shared] Inavlid Parameters', (error) => error)