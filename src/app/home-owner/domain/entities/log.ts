import { Entity } from "src/app/shared/domain/entity";
import { Household } from "./household";

export class Log extends Entity {
    constructor(visitId: string, obj?: Partial<Log>) {
        super(visitId)
        if (obj) {
            Object.assign(this, obj)
        }
    }

    status?: string // PENDING, APPROVED, PRE-APPROVED, DENIED, EXPIRED
    requestTime?: Date
    approvedTime?: Date
    rejectedTime?: Date
    isExit?: boolean
    reason?: string
    household?: Household
}