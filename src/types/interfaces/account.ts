import { AssetCategory, LiabilityCategory, Currency } from "../enums";

export interface Account {
    id?: string;
    name: string;
    type: AssetCategory | LiabilityCategory;
    bankName?: string;
    accountCode?: string;
    currency?: Currency;
    description?: string;
    bankAccountNumber?: string;
    isActive: boolean;
}