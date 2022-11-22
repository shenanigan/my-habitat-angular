export interface AddHouseholdRequest {
    name: string
    type: string
    phoneNumber?: string
    role: string
    permission?: string
    countryCode?: number
}