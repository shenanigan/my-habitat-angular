import { Entity } from "src/app/shared/domain/entity";

export class Reservation extends Entity {

    constructor(reservationId: string, obj?: Partial<Reservation>) {
        super(reservationId)
        if (obj) {
            Object.assign(this, obj)
        }
    }

    eventStartDate?: Date
    type?: string
    createdAt?: Date
    eventEndDate?: Date
}