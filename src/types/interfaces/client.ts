import { ClientStatus } from "../enums";
import { NotificationMethod } from "../enums";
import { City } from "./city";

export interface Client {
    id?: string;
    name: string;
    email: string;
    avatar?: string;
    cedula?: string;
    city: City;
    address: string;
    lat?: number;
    lng?: number;
    phone: string;
    debt: number;
    notesId?: string[];
    paymentsHistoryId?: string[];
    nextPaymentDate?: Date;
    nextPaymentAmount?: number;
    status?: ClientStatus;
    notificationMethod?: NotificationMethod;
    updatedAt?: Date;
}

export interface ClientNote {
    id?: string;
    note: string;
    createdAt: Date;
    clientId: string;
}

