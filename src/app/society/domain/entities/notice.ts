import { Entity } from "src/app/shared/domain/entity"

export class Notice extends Entity {
    constructor(obj?: any) {
        super(obj.noticeId)
        if (obj) {
            Object.assign(this, obj)
        }
    }
    text?: string
    createdAt?: Date
    tag?: string
}