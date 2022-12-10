import { createReducer, on } from "@ngrx/store";
import { noticeAdded } from "src/app/shared/+state/shared.actions";
import { Notice } from "../domain/entities/notice";
import { Society } from "../domain/entities/society";
import { failed, getSocietySuccess } from "./society.actions";

export interface ISocietyState {
    society: Society
}

const initialState: ISocietyState = {
    society: new Society('_')
}

export const societyReducer = createReducer(
    initialState,
    on(getSocietySuccess, (state, { society }) => {
        return {
            ...state,
            society
        }
    }),
    on(noticeAdded, (state, { notice }) => {
        var updatedSociety = new Society(state.society.entityId, state.society)
        var newNotice = new Notice(notice.entityId, notice);
        updatedSociety.notices.push(newNotice);
        return {
            ...state,
            society: updatedSociety
        }
    }),
    on(failed, (state, { error }) => ({
        ...state,
        errorMessage: error.message,
        isLoaded: false
    }))
)


/**
 * DONT' ALTER THE NAME BELOW. 
 * IT SHOULD BE SAME AS THE  NAME OF THE VARIABLE IN IUserState
 * */
export const societyFeatureName = 'societies'