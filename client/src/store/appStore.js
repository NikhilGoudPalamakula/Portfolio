import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const systemTheme = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

const useAppStore = create(
  persist(
    (set) => ({
      theme: systemTheme(),
      isMenuOpen: false,

      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

      toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
      closeMenu: () => set({ isMenuOpen: false }),
    }),
    {
      name: 'portfolio-ui',
      // Only the theme choice is worth remembering between visits.
      partialize: (s) => ({ theme: s.theme }),
    },
  ),
);

export default useAppStore;
