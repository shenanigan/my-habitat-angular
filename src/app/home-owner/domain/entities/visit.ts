import { Entity } from "src/app/shared/domain/entity";
import { Household } from "./household";

export class Visit extends Entity {
    constructor(visitId: string, obj?: Partial<Visit>) {
        super(visitId)
        if (obj) {
            Object.assign(obj)
        }
    }

    status?: string // PENDING, APPROVED, PRE-APPROVED, DENIED, EXPIRED
    requestTime?: Date
    household?: Household
}