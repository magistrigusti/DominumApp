import '@/styles/index.css';
import type { ReactNode } from 'react';
import { Providers } from './providers'; // 👈 обязательно правильный путь

export const metadata = {
  title: 'Dominum',
  description: 'dApp с поддержкой TON',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
