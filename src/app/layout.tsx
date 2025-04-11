import '@/styles/index.css';
import type { ReactNode } from 'react';
import { Providers } from './index'; // 👈 обязательно правильный путь

export const metadata = {
  title: 'Dominum',
  description: 'dApp с поддержкой TON',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
