import { Entity } from "src/app/shared/domain/entity";

export class Message extends Entity {
    constructor(messageId: string, obj?: Partial<Message>) {
        super(messageId)
        if (obj) {
            Object.assign(this, obj)
        }
    }

    sentById?: string
    createdAt?: Date
    type?: string
    text?: string
    imageUrl?: string
}