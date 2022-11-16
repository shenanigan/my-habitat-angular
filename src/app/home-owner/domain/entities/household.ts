import { Entity } from "src/app/shared/domain/entity"

export class Household extends Entity {
    constructor(householdId: string, obj?: any) {
        super(householdId)
        if (obj) {
            Object.assign(this, obj)
        }
    }
    name?: string
    type?: string
    phoneNumber?: string
    role?: string
    permission?: string
    countryCode?: number
    householdId?: string
}