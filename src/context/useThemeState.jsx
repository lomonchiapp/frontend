import {create} from 'zustand'

export const useThemeState = create((set) => ({
    contact: false,
    about: false,
    dealers: false,
    garantia:false,
    searchFocused: false,
    logoWidth: '200px',
    setDealers: (value) => set({ dealers: value }),
    setContact: (value) => set({ contact: value }),
    setAbout: (value) => set({ about: value }),
    setGarantia: (value) => set({ garantia: value }),
    setSearchFocused: (value) => set({ searchFocused: value }),
    setLogoWidth: (value) => set({ logoWidth: value }),
}))
