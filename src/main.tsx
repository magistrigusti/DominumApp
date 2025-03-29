import { Header } from "./components/Header"
import { SendTx } from './components/SendTx';
import { Settings } from './components/Settings';
import { Home } from './pages/Home';

export const MainPage = () => {
  return (
    <div>
      <Header />
      {/* <SendTx /> */}
      <Settings />
    </div>
  )
}