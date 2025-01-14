import { create } from "zustand";
import { Vehicle, VehicleCategory, Brand } from "@/types";
import { useGlobalState } from "./useGlobalState";

interface VehicleFilterState {
    selectedCategories: VehicleCategory[];
    selectedBrands: Brand[];
    searchText: string;
    filteredVehicles: Vehicle[];
    isSearchActive: boolean;
    loading: boolean;
    minInitPrice: number;
    maxInitPrice: number;
    minSalePrice: number;
    maxSalePrice: number;
    setMinInitPrice: (minInitPrice: number) => void;
    setMaxInitPrice: (maxInitPrice: number) => void;
    setMinSalePrice: (minSalePrice: number) => void;
    setMaxSalePrice: (maxSalePrice: number) => void;
    updateFilters: () => void;
    setFilteredVehicles: (filteredVehicles: Vehicle[]) => void;
    setSearchText: (searchText: string) => void;
    setSelectedCategories: (categories: VehicleCategory[]) => void;
    setSelectedBrands: (brands: Brand[]) => void;
}

const initialState = {
    selectedCategories: [] as VehicleCategory[],
    selectedBrands: [] as Brand[],
    searchText: '',
    filteredVehicles: [] as Vehicle[],
    isSearchActive: false,
    loading: false,
    minInitPrice: 0,
    maxInitPrice: 0,
    minSalePrice: 0,
    maxSalePrice: 0,
}

export const useVehicleFilter = create<VehicleFilterState>((set, get) => ({
    ...initialState,

    updateFilters: () => {
        const state = get()
        const { vehicles, myInit } = useGlobalState.getState()
        
        if (!vehicles) return

        const isActive = state.searchText.trim() !== '' || 
            state.selectedBrands.length > 0 || 
            state.selectedCategories.length > 0 ||
            myInit > 0

        const filtered = vehicles.filter(vehicle => {
            if (!vehicle) return false

            const searchLower = (state.searchText || '').toLowerCase()
            const vehicleName = (vehicle.name || '').toLowerCase()
            const brandName = (vehicle.brand?.name || '').toLowerCase()
            const categoryName = (vehicle.category?.name || '').toLowerCase()

            const matchesSearch = searchLower === '' || 
                vehicleName.includes(searchLower) ||
                brandName.includes(searchLower) ||
                categoryName.includes(searchLower)

            const matchesBrand = state.selectedBrands.length === 0 || 
                state.selectedBrands.some(selectedBrand => 
                    vehicle.brand?.id === selectedBrand.id
                )

            const matchesCategory = state.selectedCategories.length === 0 || 
                state.selectedCategories.some(selectedCategory => 
                    vehicle.category?.id === selectedCategory.id
                )

            const requiredInitial = vehicle.initPrice || Math.round(vehicle.salePrice * 0.3)
            const matchesInitial = myInit === 0 || requiredInitial <= myInit

            return matchesSearch && matchesBrand && matchesCategory && matchesInitial
        })

        set({ 
            filteredVehicles: filtered,
            isSearchActive: isActive,
            loading: false 
        })
    },

    setMinInitPrice: (minInitPrice) => {
        set({ minInitPrice })
        get().updateFilters()
    },
    setMaxInitPrice: (maxInitPrice) => {
        set({ maxInitPrice })
        get().updateFilters()
    },
    setMinSalePrice: (minSalePrice) => {
        set({ minSalePrice })
        get().updateFilters()
    },
    setMaxSalePrice: (maxSalePrice) => {
        set({ maxSalePrice })
        get().updateFilters()
    },
    setFilteredVehicles: (filteredVehicles) => set({ filteredVehicles }),
    setSelectedCategories: (categories) => {
        set({ selectedCategories: categories })
        get().updateFilters()
    },
    setSelectedBrands: (brands) => {
        set({ selectedBrands: brands })
        get().updateFilters()
    },
    setSearchText: (searchText) => {
        set({ searchText })
        get().updateFilters()
    },
}));

