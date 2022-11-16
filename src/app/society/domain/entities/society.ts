import { Entity } from "src/app/shared/domain/entity";
import { Notice } from "./notice";

export class Society extends Entity {

    constructor(obj?: any) {
        super(obj?.societyId);
        if (obj) {
            Object.assign(this, obj);
        }
    }
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    notices: Notice[] = []
}