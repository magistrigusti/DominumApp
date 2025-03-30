import { TonConnectUIProvider, THEME } from "@tonconnect/ui-react";
import { MainPage } from "./main";


function App() {
  return (
    <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
      walletsListConfiguration={{}}
      uiPreferences={{
        borderRadius: 'none',
        colorsSet: {
          [THEME.DARK]: {
            connectButton: { background: 'red' }
          }
        }
      }}
    >
      
      <div className="app">
          <div style={{color: 'white', background: 'black'}}>Hello, world!</div>

        <MainPage />
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
