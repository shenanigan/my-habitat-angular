export interface IEditReservation {
    amenity: string
    startDateTime: Date
    endDateTime: Date
    reservationId: string
    oldStartDateTime?: Date
}