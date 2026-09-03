import { useEffect } from 'react';
import useAppStore from '@/store/appStore';

// Mirrors the stored theme onto <html data-theme> — every token reads off it.
const useTheme = () => {
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return { theme, toggleTheme };
};

export default useTheme;
