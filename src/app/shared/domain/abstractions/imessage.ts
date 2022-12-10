
export interface IMessage {
    entityId: string
    sentById: string
    createdAt: Date
    type: string
    text?: string
    imageUrl?: string
}