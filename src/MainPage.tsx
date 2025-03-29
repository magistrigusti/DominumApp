import { Header } from "./Header"
import { SendTx } from './SendTx';
import { Settings } from './Settings';

export const MainPage = () => {
  return (
    <div>
      <Header />
      <SendTx />
      <Settings />
    </div>
  )
}