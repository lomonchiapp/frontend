import { create } from "zustand";

export const useVehiclesState = create((set) => ({
    vehicles: [],
    setVehicles: (vehicles) => set({ vehicles }),
    }));