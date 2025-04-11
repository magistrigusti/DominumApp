'use client';

import { ReactNode } from 'react';
import { TonConnectUIProvider, THEME } from '@tonconnect/ui-react';
import { UserProvider } from '@/app/context/UserContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
      uiPreferences={{
        borderRadius: 's',
        colorsSet: {
          [THEME.DARK]: {
            connectButton: { background: 'orange' },
          },
        },
      }}
    >
      <UserProvider>{children}</UserProvider>
    </TonConnectUIProvider>
  );
}
