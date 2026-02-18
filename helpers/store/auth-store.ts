import { create } from "zustand";

export interface AuthUser {
  token: string;
  fullName?: string;
  avatarUrl?: string;
}

export interface AuthStore {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
