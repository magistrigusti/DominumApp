import { useState } from 'react';
import { TonConnectUIProvider, THEME } from "@tonconnect/ui-react";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MenuPage } from "./pages/MenuPage/MenuPage";
import { Header } from "./components/Header";

function App() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
      walletsListConfiguration={{}}
      uiPreferences={{
        borderRadius: 'none',
        colorsSet: {
          [THEME.DARK]: {
            connectButton: {
              background: 'red'
            }
          }
        }
      }}
    >
      <div className="fullscreen container">
        <Header onWalletStatusChange={setIsConnected} />

        {isConnected ? <MenuPage /> : <LoginPage />}
      </div>
    </TonConnectUIProvider>
  )
}

export default App;