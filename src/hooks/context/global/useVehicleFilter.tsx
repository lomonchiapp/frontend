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
        const { vehicles } = useGlobalState.getState()
        
        if (!vehicles) return

        const isActive = state.searchText.trim() !== '' || 
            state.selectedBrands.length > 0 || 
            state.selectedCategories.length > 0 ||
            state.minInitPrice > 0 || 
            state.maxInitPrice > 0 ||
            state.minSalePrice > 0 || 
            state.maxSalePrice > 0

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

            const matchesInitPrice = 
                (state.minInitPrice === 0 || (vehicle.initPrice || 0) >= state.minInitPrice) &&
                (state.maxInitPrice === 0 || (vehicle.initPrice || 0) <= state.maxInitPrice)

            const matchesSalePrice = 
                (state.minSalePrice === 0 || (vehicle.salePrice || 0) >= state.minSalePrice) &&
                (state.maxSalePrice === 0 || (vehicle.salePrice || 0) <= state.maxSalePrice)

            return matchesSearch && matchesBrand && matchesCategory && 
                matchesInitPrice && matchesSalePrice
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

