
export interface ILog {
    entityId?: string
    status?: string // PENDING, APPROVED, PRE-APPROVED, DENIED, EXPIRED
    requestTime?: Date
    approvedTime?: Date
    rejectedTime?: Date
    isExit?: boolean
    reason?: string
}