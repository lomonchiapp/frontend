// Client enums
export enum ClientStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    DEBTOR = "debtor"
}

// Notification enums

export enum NotificationMethod {
    EMAIL = "email",
    SMS = "sms",
    WHATSAPP = "whatsapp"
}

export enum NotificationStatus {
    PENDING = "pending",
    SENT = "sent",
    FAILED = "failed"
}


export enum NotificationType {
    PAYMENT_REMINDER = "paymentReminder",
    DEBT_REMINDER = "debtReminder",
    NEW_SALE = "newSale",
    NEW_CLIENT = "newClient"
}


 // Payment enums

export enum PaymentFrequency {
    DAILY = "Diario",
    WEEKLY = "Semanal",
    BIWEEKLY = "Quincenal",
    MONTHLY = "Mensual"
}

export enum PaymentMethod {
    CASH = "cash",
    CREDIT = "credit",
    TRANSFER = "transfer"
}

export enum PaymentStatus {
    PENDING = "pending",
    PAID = "paid",
    PARTIAL = "partial",
    CANCELLED = "cancelled"
}

// Currency enums

export enum Currency {
    DOP = "DOP",
    USD = "USD",
}

// User enums

export enum UserRole {
    ADMIN = "admin",
    SELLER = "seller",
    CLIENT = "client",
    CASHIER = "cashier",
    CONDUCTOR = "conductor",
    ACCOUNTANT = "accountant"
}

// Sale enums
export enum SaleStatus {
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    ACTIVE = "active", // AL DIA
    ON_HOLD = "onHold", // RETENIDA, DEBE MAS DE 90 DIAS. 
    DEBTOR = "debtor" // DEBE ENTRE 30 Y 90 DIAS. 

}

export enum SaleType {
    FINANCING = "financing",
    CASH = "cash"
}

// Accounting enums

export enum AssetCategory {
    CASH = "Caja",
    BANK = "Banco",
    INVENTORY = "Inventario",
    FIXED_ASSETS = "Activos Fijos",
    OTHER = "Otros"
}
export enum LiabilityCategory {
    ACCOUNTS_PAYABLE = "Cuentas por Pagar",
    CREDIT_CARD = "Tarjetas de Credito",
    LONG_TERM_LIABILITY = "Pasivos a Largo Plazo",
    OTHER_CURRENT_LIABILITIES = "Otros Pasivos Corrientes",
    TAXES_PAYABLE = "Impuestos por Pagar",
    OTHER = "Otros"
}


// Application enums

export enum ApplicationStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}