import { Header } from "./Header"
import { SendTx } from './SendTx';
import { Settings } from './Settings';
import bgImage from './assets/main-bg.jpg';

export const MainPage = () => {
  return (
    <div
      style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',       // картинка займет всю область
      backgroundRepeat: 'no-repeat', // без повторения
      backgroundPosition: 'center',  // по центру
      width: '100%',
      height: '100vh',               // высота на весь экран
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <Header />
      <SendTx />
      <Settings />
    </div>
  )
}