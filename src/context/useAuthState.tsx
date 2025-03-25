import { create } from 'zustand'
import { User } from 'firebase/auth'

interface AuthState {
  user: User | null
  loading: boolean
  loginDialogOpen: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setLoginDialogOpen: (open: boolean) => void
}

export const useAuthState = create<AuthState>((set) => ({
  user: null,
  loading: true,
  loginDialogOpen: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setLoginDialogOpen: (open) => set({ loginDialogOpen: open })
})) 