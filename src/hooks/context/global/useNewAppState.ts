import { create } from 'zustand'
import { Client, Vehicle } from '@/types'

interface NewAppState {
  initialDeposit: number
  financingMonths: number
  setInitialDeposit: (deposit: number) => void
  setFinancingMonths: (months: number) => void
  client: Client | null
  setClient: (client: Client | null) => void
  vehicle: Vehicle | null
  setVehicle: (vehicle: Vehicle | null) => void
  resetForm: () => void
}

export const useNewAppState = create<NewAppState>((set) => ({
  initialDeposit: 0,
  financingMonths: 12,
  client: null,
  vehicle: null,
  setInitialDeposit: (deposit) => set({ initialDeposit: deposit }),
  setFinancingMonths: (months) => set({ financingMonths: months }),
  setClient: (client) => set({ client }),
  setVehicle: (vehicle) => set({ vehicle }),
  resetForm: () => set({ initialDeposit: 0, financingMonths: 12, client: null, vehicle: null })
})) 