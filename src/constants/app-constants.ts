export const USER_ROLES = {
    ADMIN: "admin",
    SELLER: "seller",
} as const;

export const SALE_STATUS = {
    PENDING: "pending",
    PAID: "paid",
    CANCELLED: "cancelled",
} as const;

export const PAYMENT_METHODS = {
    CASH: "cash",
    CREDIT: "credit",
    TRANSFER: "transfer",
} as const; 