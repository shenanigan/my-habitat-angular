import { Entity } from "src/app/shared/domain/entity";
import { Home } from "./home";
import { Household } from "./household";

export class HomeOwner extends Entity {

    constructor(homeOwnerId: string, obj?: Partial<HomeOwner>) {
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
    home?: Home
    households: Household[] = []
}