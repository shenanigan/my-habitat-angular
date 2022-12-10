import { Entity } from "src/app/shared/domain/entity";
import { Home } from "./home";
import { Household } from "./household";
import { KeyValue } from "./KeyValue";
import { Log } from "./log";
import { Message } from "./message";
import { Payment } from "./payment";

export class HomeOwner extends Entity {

    constructor(homeOwnerId: string, obj?: Partial<HomeOwner>) {
        super(homeOwnerId);
        if (obj) {
            Object.assign(this, obj);
            this.households = []
            const households = obj.households?.map(household => new Household(household.entityId, household))
            if (households) {
                this.households = households
            }

            const logs = obj.logs?.map(log => new Log(log.entityId, log))
            if (logs) {
                this.logs = logs
            }

            const messages = obj.messages?.map(message => new Message(message.entityId, message))
            if (messages) {
                this.messages = messages
            }

            this.payments = []
            const payments = obj.payments?.map(payment => new Payment(payment.entityId, payment))
            if (payments) {
                this.payments = payments
            }

            this.hasViewedMessages = []
            const hasViewedMessages = obj.hasViewedMessages?.map(x => new KeyValue(x))
            if (hasViewedMessages) {
                this.hasViewedMessages = hasViewedMessages
            }
        }
    }
    societyId?: string
    name?: string
    email?: string
    phoneNumber?: string
    countryCode?: number
    home?: Home
    households: Household[] = []
    logs: Log[] = []
    messages: Message[] = []
    payments: Payment[] = []
    hasViewedMessages: KeyValue[] = []
    hasViewedNoticeboard: boolean = true
    hasViewedPayments: boolean = true

    get truncatedName(): string | undefined {
        const names = this.name?.split(' ')
        var name = this.name
        if ((names?.length ?? 0) > 1) {
            name = `${names?.[0]} ${names?.[1].substring(0, 1)}.`
        }
        return name
    }
}