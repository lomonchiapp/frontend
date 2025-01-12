import { ApplicationStatus } from "../enums"

export interface Application {
    id: string
    clientId: string
    vehicleId: string
    status: ApplicationStatus
    initialPaymentAmount: number
    financingMonths: number
    name: string
    description: string
    createdAt: Date
    updatedAt: Date
}