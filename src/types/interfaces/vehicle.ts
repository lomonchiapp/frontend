export interface Vehicle {
    id?: string;
    name: string;
    brand: Brand;
    quantity: number;
    isInexhaustible: boolean;
    category: VehicleCategory;
    initPrice: number;
    salePrice: number;
    description?: string;
    images: string[];
    cc: string;
}

export interface Brand {
    id?: string;
    name: string;
    logo: string;
}

export interface VehicleCategory {
    id?: string;
    name: string;
    image: string | null;
}