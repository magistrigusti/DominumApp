import { TonConnectUIProvider, THEME } from "@tonconnect/ui-react";
import { MainPage } from "./MainPage";

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
      <MainPage />
    </TonConnectUIProvider>
  )
}

export default App;