import { Entity } from "src/app/shared/domain/entity";

export class Payment extends Entity {

    constructor(paymentId: string, obj?: Partial<Payment>) {
        super(paymentId)
        if (obj) {
            Object.assign(this, obj)

            if (this.status) {
                this.title= `Your annual maintenance is ${this.status.toLowerCase()}`   
            }
        }
    }
    title?:string
    amount?: number
    type?: string
    createdAt?: Date
    paymentDate?: Date
    dueDate?: Date
    status?: string
    currency?: string
    transactionId?: string
    paymentMethod?: string
    paymentDetails?: string
}