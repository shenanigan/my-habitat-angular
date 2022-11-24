export interface AddHouseholdRequest {
    homeOwnerId: string
    name: string
    type: string
    phoneNumber?: string
    role: string
    permission?: string
    countryCode?: number
}