export class ListRequest {
    constructor(obj?: any) {
        if (obj) {
            Object.assign(this, obj);
        }
    }
    skip: number = 0
    take: number = 30
    filter?: string
    orderBy?: string
    orderByDescending: boolean = false;
}