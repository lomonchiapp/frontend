import { UserRole } from "../enums";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    isActive?: boolean;
    config?: {
        theme: 'light' | 'dark';
        notificationsEnabled: boolean;
        styleConfig: {
            primaryColor: string;
            secondaryColor: string;
            accentColor: string;
        };
    };
}