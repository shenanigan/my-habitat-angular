export interface IMarkPaymentPaidRequest {
    paymentId: string
    transactionId?: string
    paymentMethod: string
    paymentDetails: string
}