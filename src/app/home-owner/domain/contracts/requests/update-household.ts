export interface IUpdateHouseholdRequest {
    id:string
    name: string
    type: string
    email?:string
    phoneNumber?: string
    role: string
    permission?: string
    countryCode?: number
    imageUrl?: string
}