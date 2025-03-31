import { useState } from 'react';
import { TonConnectUIProvider, THEME } from "@tonconnect/ui-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MenuPage } from "./pages/MenuPage/MenuPage";
import { Header } from "./components/Header";
import { PortalPage } from "./pages/PortalPage/PortalPage";
import { DominumPage } from "./pages/DominumPage/DominumPage";
import { MagisteriumPage } from "./pages/MagisteriumPage/MagisteriumPage";
import { MercatusPage } from "./pages/MercatusPage/MercatusPage";

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
              background: 'orange'
            }
          }
        }
      }}
    >
      <Router>
      <div className="fullscreen container">
        <Header onWalletStatusChange={setIsConnected} />

        <Routes>
          {!isConnected && <Route path="*" element={<LoginPage />} />}

          {isConnected && (
            <>
            <Route path="/" element={<MenuPage />} />
            <Route path="/portal" element={<PortalPage />} />
            <Route path="/dominum" element={<DominumPage />} />
            <Route path="/magisterium" element={<MagisteriumPage />} />
            <Route path="/mercatus" element={<MercatusPage />} />
          </>
          )}
        </Routes>
      </div>
      </Router>

    </TonConnectUIProvider>
  )
}

export default App;