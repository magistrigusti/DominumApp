import { useEffect, useState } from "react";
import { TonConnectButton, useTonWallet, CHAIN } from "@tonconnect/ui-react";
import { Link } from "react-router-dom";
import styles from "./UserPage.module.css";


const formatAddress = (address: string) => {
  return `${address.slice(0, 8)}...${address.slice(-8)}`;
};


export const UserPage = () => {
  const wallet = useTonWallet();
  const [tonBalance, setTonBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (wallet?.account?.address) {
        const response = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${wallet.account.address}`);
        const data = await response.json();

        if (data.ok) {
          const tons = parseFloat(data.result) / 1e9;
          setTonBalance(tons.toFixed(4) + " TON");
        }
      }
    };

    fetchBalance();
  }, [wallet]);

  return (
    <div style={{
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
    }}>
      <div className={styles.user_header_wrapper}>
        <img className={styles.user_img}
          src="/icons/user-icon.png"
          alt="User Profile"
        />

        <p>{wallet?.account?.address ? "Magistru" : "Не подключено"}</p>
      </div>

      <div style={{ alignSelf: 'flex-start' }}>
        <Link to="/" style={{
          textDecoration: 'none',
          color: '#fff',
          fontSize: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span style={{ fontSize: '1.5rem' }}>←</span> Назад
        </Link>
      </div>

      {/* Кошелёк */}
      <div style={{ textAlign: 'center' }}>
        {wallet && (
          <>
            <p><strong>Кошелёк:</strong> {formatAddress(wallet.account.address)}</p>

            <p><strong>Сеть:</strong> {wallet.account.chain === CHAIN.TESTNET ? "Testnet" : "Mainnet"}</p>
            <p><strong>Баланс:</strong> {tonBalance ?? 'Загрузка...'}</p>
          </>
        )}
      </div>

      {/* Кнопка подключения */}
      <TonConnectButton />
    </div>
  );
};
