import { Entity } from "src/app/shared/domain/entity";
import { Home } from "./home";
import { Household } from "./household";

export class SecurityGuard extends Entity {

    constructor(homeOwnerId: string, obj?: Partial<SecurityGuard>) {
        super(homeOwnerId);
        if (obj) {
            Object.assign(this, obj);
            this.households = []
            const households = obj.households?.map(household => new Household(household.entityId, household))
            if (households) {
                this.households = households
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
}