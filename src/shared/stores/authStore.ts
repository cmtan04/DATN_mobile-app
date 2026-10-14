import { create } from "zustand";
import { User } from "../types";
import { secureStorage } from "../services/secureStore";
import { axiosClient, setSessionExpiredHandler } from "../api/axiosClient";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, accessToken: string, refreshToken: string) => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
  // Register session expired handler to automatically reset auth state
  setSessionExpiredHandler(() => {
    set({ user: null, isAuthenticated: false, isLoading: false });
  });

  return {
    user: null,
    isAuthenticated: false,
    isLoading: true,

    setAuth: async (user: User, accessToken: string, refreshToken: string) => {
      await secureStorage.setTokens(accessToken, refreshToken);
      set({ user, isAuthenticated: true, isLoading: false });
    },

    setUser: (user: User | null) => {
      set({ user });
    },

    logout: async () => {
      const refreshToken = await secureStorage.getRefreshToken();
      if (refreshToken) {
        try {
          await axiosClient.post("/auth/logout", { refreshToken });
        } catch {
          // Ignore logout network error on clean up
        }
      }
      await secureStorage.clearTokens();
      set({ user: null, isAuthenticated: false, isLoading: false });
    },

    initializeAuth: async () => {
      set({ isLoading: true });
      const token = await secureStorage.getAccessToken();
      if (!token) {
        set({ user: null, isAuthenticated: false, isLoading: false });
        return;
      }

      try {
        const response = await axiosClient.get<User>("/users/me");
        set({ user: response.data, isAuthenticated: true, isLoading: false });
      } catch {
        await secureStorage.clearTokens();
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    },
  };
});
