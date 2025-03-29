import { useEffect } from 'react';

const tg = window.Telegram.WebApp;

export function useTelegram() {
  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => tg.close();

  return {
    tg,
    onClose,
    user: tg.initDataUnsafe?.user,
  };
}
