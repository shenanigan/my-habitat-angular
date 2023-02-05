export class Amenity {

    constructor(obj?: Partial<Amenity>) {
        if (obj) {
            Object.assign(this, obj)
            this.startDateTime = new Date('' + obj.startDateTime);
            this.endDateTime = new Date('' + obj.endDateTime);
        }
    }

    isActive?: boolean
    slotDuration?: number
    name?: string
    icon?: string
    startDateTime?: Date
    endDateTime?: Date
}