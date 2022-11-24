import { Entity } from "src/app/shared/domain/entity";

export class SecurityGuard extends Entity {

    constructor(homeOwnerId: string, obj?: Partial<SecurityGuard>) {
        super(homeOwnerId);
        if (obj) {
            Object.assign(this, obj);
        }
    }
    societyId?: string
    name?: string
    email?: string
    phoneNumber?: string
    countryCode?: number

    get truncatedName(): string | undefined {
        const names = this.name?.split(' ')
        var name = this.name
        if ((names?.length ?? 0) > 1) {
            name = `${names?.[0]} ${names?.[1].substring(0, 1)}.`
        }
        return name
    }
}