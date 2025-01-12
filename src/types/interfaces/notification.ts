import { NotificationStatus, NotificationType } from "../enums";

export interface Notification {
    id?: string;
    clientId: string;
    type: NotificationType;
    status: NotificationStatus;
    message: string;
    createdAt: Date;
}
