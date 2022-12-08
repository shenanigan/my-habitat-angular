import { Entity } from "src/app/shared/domain/entity";

export class Payment extends Entity {

    constructor(paymentId: string, obj?: Partial<Payment>) {
        super(paymentId)
        if (obj) {
            Object.assign(this, obj)
        }
    }

    amount?: number
    type?: string
    createdAt?: Date
    paymentDate?: Date
    status?: string
    currency?: string
    transactionId?: string
    paymentMethod?: string
    paymentDetails?: string
}