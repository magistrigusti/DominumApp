import { TonConnectUIProvider, THEME, useTonWallet } from "@tonconnect/ui-react";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MenuPage } from "./pages/MenuPages/MenuPages";
import { Header } from "./components/Header";

function App() {
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
      <Header />

      {wallet ? <MenuPage /> : <LoginPage />}
    </TonConnectUIProvider>
  )
}

export default App;