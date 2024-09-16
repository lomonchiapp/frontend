import {create} from 'zustand'

export const useSearchState = create((set) => ({
    searchText:'',
    setSearchText: (value) => set({ searchText: value }),
}))