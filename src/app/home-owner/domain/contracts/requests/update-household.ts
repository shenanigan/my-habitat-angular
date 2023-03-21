export interface UpdateHouseholdRequest {
    householdId:string
    name?: string
    email?:string
    phoneNumber?: string
    role?: string
    permission?: string
    countryCode?: number
    imageUrl?: string
    type?: string
}