
export interface IPayment {
    entityId: string
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