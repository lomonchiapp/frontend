import { create } from "zustand";
import { getVehicles } from '@/hooks/getVehicles';
import { Vehicle, VehicleCategory, Brand } from "@/types";



interface GlobalState {
    vehicles: Vehicle[];
    selectedVehicle: Vehicle | null;
    categories: VehicleCategory[];
    brands: Brand[];
    searchText: string;
    filteredVehicles: Vehicle[];
    loading: boolean;
    setVehicles: (vehicles: Vehicle[]) => void;
    setFilteredVehicles: (filteredVehicles: Vehicle[]) => void;
    setSelectedVehicle: (vehicle: Vehicle | null) => void;
    setSearchText: (searchText: string) => void;
    fetchVehicles: () => Promise<void>;
    setCategories: (categories: VehicleCategory[]) => void;
    setBrands: (brands: Brand[]) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
    loading: true,
    searchText: '',
    vehicles: [],
    filteredVehicles: [],
    categories:[],
    brands:[],
    selectedVehicle: null,
    setFilteredVehicles: (filteredVehicles: Vehicle[]) => set({ filteredVehicles }),
    setVehicles: (vehicles: Vehicle[]) => set({ vehicles }),  
    setCategories: (categories: VehicleCategory[]) => set({ categories }),
    setBrands: (brands: Brand[]) => set({ brands }),
    setSelectedVehicle: (vehicle: Vehicle | null) => set({ selectedVehicle: vehicle }),
    setSearchText: (searchText: string) => set({ searchText }),
    fetchVehicles: async () => {
        const vehicles = await getVehicles();
        set({ vehicles });
    }
}));

