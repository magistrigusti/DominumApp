import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { TonConnectUIProvider, THEME } from '@tonconnect/ui-react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
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
    <BrowserRouter>
      <UserProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UserProvider>

    </BrowserRouter>
  </TonConnectUIProvider>
);

