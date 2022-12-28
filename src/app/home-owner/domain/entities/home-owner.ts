import { Entity } from "src/app/shared/domain/entity";
import { Home } from "./home";
import { Household } from "./household";
import { KeyValue } from "./KeyValue";
import { Log } from "./log";
import { Message } from "./message";
import { Payment } from "./payment";
import { Reservation } from "./reservation";

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

            this.reservations = []

            const jsonReservations: Reservation[] = [
                {
                    entityId: '',
                    createdAt: new Date(),
                    eventEndDate: new Date(1672525565000),
                    eventStartDate: new Date(1672525523000),
                    type: 'Tennis'
                },
                {
                    entityId: '',
                    createdAt: new Date(),
                    eventEndDate: new Date(1670525523000),
                    eventStartDate: new Date(1670525223000),
                    type: 'Tennis'
                }
            ]
            const reservations = jsonReservations.map(reservation => new Reservation(reservation.entityId, reservation))
            if (reservations) {
                this.reservations = reservations
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
    reservations: Reservation[] = []
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