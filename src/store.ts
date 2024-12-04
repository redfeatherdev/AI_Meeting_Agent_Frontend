import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(persist(
  (set) => ({
    isAuthenticated: false,
    access: null,
    refresh: null,
    setAuthenticated: (state: boolean) => set({ isAuthenticated: state }),
    updateAccess: (newAccess: string) => set({ access: newAccess }),
    logIn: (access: string, refresh: string) => set({ isAuthenticated: true, access: access, refresh: refresh }),
    logOut: () => set({ isAuthenticated: false, access: null, refresh: null })
  }),
  {
    name: 'auth-storage',
    getStorage: () => localStorage
  }
))

export { useAuthStore }