'use client';
// import { ThemeProvider } from "@material-tailwind/react";
import { PropsWithChildren, useEffect } from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDeviceScreen from '../hooks/useDeviceScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ScreenSizeChecker from '@/src/hooks/ScreenSizeChecker';

export const queryClient = new QueryClient();

export default function ProvidersLayout({ children }: { children: React.ReactNode }) {
  const { isDesktop } = useDeviceScreen();

  return (
    <div>
      {' '}
      {/* pt-safe px-safe pb-safe toolbar */}
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <ScreenSizeChecker>{children}</ScreenSizeChecker>
            <ToastContainer
              position={isDesktop ? 'top-right' : 'bottom-center'}
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </PersistGate>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}
