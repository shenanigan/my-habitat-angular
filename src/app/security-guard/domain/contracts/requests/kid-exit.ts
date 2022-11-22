import { Household } from "../../entities/household";

export interface KidExitRequest {
    household: Household
    hours: number
}