import { Entity } from "src/app/shared/domain/entity"

export class Household extends Entity {
    constructor(householdId: string, obj?: any) {
        super(householdId)
        if (obj) {
            Object.assign(this, obj)
        }
    }
    name?: string
    type?: string
    phoneNumber?: string
    role?: string
    permission?: string
    countryCode?: number
    imageUrl?: string

    get formattedType(): string | undefined {
        return this.type?.replace('_', ' ').toLocaleLowerCase()
    }

    get truncatedName(): string | undefined {
        const names = this.name?.split(' ')
        var name = this.name
        if ((names?.length ?? 0) > 1) {
            name = `${names?.[0]} ${names?.[1].substring(0, 1)}.`
        }
        return name
    }
}