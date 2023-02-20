import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthDefaultState } from "@tm-wear/app/api/types/auth";

export interface AuthState extends AuthDefaultState {
  createAuth: (data: AuthDefaultState) => void;
  logout: () => void;
}

const defaultStore = {
  user: null,
  token: null,
  expiresAt: null,
} as AuthDefaultState;

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...defaultStore,
      createAuth: ({ user, token, expiresAt }) =>
        set({ user, token, expiresAt }),
      logout: () => {
        set({ ...defaultStore });
        useAuthStore.persist.clearStorage();
      },
    }),
    { name: "auth" }
  )
);

export default useAuthStore;
