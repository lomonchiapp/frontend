import { PaymentSchedule } from "./payment";
import { PaymentFrequency } from "../enums";
import { SaleType } from "../enums";
import { SaleStatus } from "../enums";
import { PaymentMethod } from "../enums";

export interface Sale {
    id?: string;
    vehicleId?: string;
    clientId?: string;
    sellerId?: string;
    saleNumber?: string;
    paymentsId?: string[];
    type: SaleType;
    paymentFrequency: PaymentFrequency;
    paymentSchedule?: PaymentSchedule[];
    initialPaymentNeeded?: boolean;
    initPaymentId?: string;
    initPaymentAmount?: number;
    paymentDays?: number[];
    salePrice: number;
    saleDate: Date;
    financingMonths?: number;
    interestRate?: number;
    noInterest?: boolean;
    debt: number;
    status: SaleStatus;
    lateFee?: number;
    paymentMethod: PaymentMethod;
    count?: number; // contador de ventas para la numeracion de facturas.
}