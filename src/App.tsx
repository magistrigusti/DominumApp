import { TonConnectUIProvider, THEME } from "@tonconnect/ui-react";
import { MainPage } from "./main";
import { useTelegram } from "./hooks/useTelegram";

function App() {
  const { user, onClose } = useTelegram();

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
        <h1>Привет, {user?.first_name || 'гость'}!</h1>
        {user && (
          <div>
            <p>Твой Telegram ID: {user.id}</p>
            <p>Логин: @{user.username || 'не указан'}</p>
          </div>
        )}

        <button onClick={onClose}>Закрыть приложение</button>

        <MainPage />
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
