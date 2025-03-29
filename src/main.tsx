import { Header } from "./components/Header"
import { SendTx } from './components/SendTx';
import { Settings } from './components/Settings';

export const MainPage = () => {
  return (
    <div>
      <Header />
      <SendTx />
      <Settings />
    </div>
  )
}