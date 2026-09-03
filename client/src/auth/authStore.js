import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: ({ user, token }) =>
        set({ user, token, isAuthenticated: Boolean(token) }),

      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: 'portfolio-auth' },
  ),
);

export default useAuthStore;
