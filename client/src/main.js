import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import AntdThemeProvider from './theme/AntdThemeProvider';
import useAppStore from './store/appStore';
import './styles/global.scss';

// Paint the stored theme before the first render so there's no light flash.
document.documentElement.dataset.theme = useAppStore.getState().theme;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AntdThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AntdThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
