import { Reservation } from "./reservation";
import { Entity } from "src/app/shared/domain/entity";
import { Amenity } from "./amenity";



export class Society extends Entity {

    constructor(societyId: string, obj?: any) {
        super(societyId);
        if (obj) {
            Object.assign(this, obj);
            this.amenities = []
            const amenities = obj.amenities?.map((amenity: Partial<Amenity>) => new Amenity(amenity))
            if (amenities) {
                this.amenities = amenities
            }

            if (obj.reservations) {
                this.reservations = {}
                obj.reservations.forEach((amenityReservations: any) => {
                    const amenity = amenityReservations.key
                    if (this.reservations[amenity] === undefined) {
                        this.reservations[amenity] = {}
                    }
                    amenityReservations.value.forEach((dateReservations: any) => {
                        const date = dateReservations.key
                        if (this.reservations[amenity][date] === undefined) {
                            this.reservations[amenity][date] = []
                        }
                        dateReservations.value.forEach((r: any) => {
                            const reservation = new Reservation(r.entityId, r);
                            this.reservations[amenity][date].push(reservation);
                        });
                    })
                });

            }
        }
    }
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    reservations: { [id: string]: { [id: string]: Reservation[] } } = {}
    amenities: Amenity[] = []
}