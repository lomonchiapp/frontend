import {create} from 'zustand'

interface useThemeStateProps {
    contact: boolean;
    about: boolean;
    dealers: boolean;
    garantia: boolean;
    searchFocused: boolean;
    setDealers: (value: boolean) => void;
    setContact: (value: boolean) => void;
    setAbout: (value: boolean) => void;
    setGarantia: (value: boolean) => void;
    setSearchFocused: (value: boolean) => void;
}

export const useThemeState = create<useThemeStateProps>((set) => ({
    contact: false,
    about: false,
    dealers: false,
    garantia:false,
    searchFocused: false,
    setDealers: (value) => set({ dealers: value }),
    setContact: (value) => set({ contact: value }),
    setAbout: (value) => set({ about: value }),
    setGarantia: (value) => set({ garantia: value }),
    setSearchFocused: (value) => set({ searchFocused: value }),
}))
