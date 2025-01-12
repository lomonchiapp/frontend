import { PaymentMethod } from "../enums";

import { PaymentStatus } from "../enums";

export interface Payment {
    id?: string;
    saleId: string;
    clientId: string;
    vehicleId: string;
    date: Date;
    description: string;
    paymentNumber: string;
    isDeleted: boolean;
    deletedAt?: Date;
    accountDestinationId: string;
    status: PaymentStatus;
    deletedReason?: string;
    paymentMethod: PaymentMethod;
    amount: number;
}

export interface PaymentSchedule {
    id?: string;
    amount: number;
    dueDate: Date;
    interest: number;
    principal: number;
    remainingBalance: number;
    status: PaymentStatus;
    paidAmount?: number;
    paymentNumbers?: string[];
}