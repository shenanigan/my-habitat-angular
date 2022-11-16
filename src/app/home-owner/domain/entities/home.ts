import { Entity } from "src/app/shared/domain/entity"

export class Home extends Entity {
    constructor(homeId: string, obj?: any) {
        super(homeId)
        if (obj) {
            Object.assign(this, obj)
        }
    }
    unit?: string
}