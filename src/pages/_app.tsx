import type { AppProps } from 'next/app';
import { TonConnectUIProvider, THEME } from '@tonconnect/ui-react';
import { UserProvider } from '@/context/UserContext';
import { UserLoader } from '@/components/UserLoader/UserLoader'; // 👈 импортируем
import '@/styles/index.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
      uiPreferences={{
        borderRadius: 'none',
        colorsSet: {
          [THEME.DARK]: {
            connectButton: { background: 'orange' }
          }
        }
      }}
    >
      <UserProvider>
        <UserLoader> {/* 👈 оборачиваем весь интерфейс */}
          <Component {...pageProps} />
        </UserLoader>
      </UserProvider>
    </TonConnectUIProvider>
  );
}
