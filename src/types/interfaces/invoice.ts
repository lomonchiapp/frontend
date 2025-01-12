import { PaymentMethod } from "../enums";
import { Timestamp } from "firebase/firestore";

export interface Invoice {
    id?: string;
    saleId: string;
    clientId: string;
    paymentId: string;
    vehicleId: string;
    invoiceNumber: string;
    date: Date | Timestamp;
    amount: number;
    isPaid: boolean;
    paymentMethod: PaymentMethod;
    paymentDate: Date | Timestamp;
    paymentNumber: string;
    isDeleted: boolean;
    deletedAt?: Date | Timestamp;
    deletedReason?: string;
}
