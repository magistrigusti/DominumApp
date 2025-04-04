import { useEffect, useState } from "react";
import { TonConnectButton, useTonWallet, CHAIN, toUserFriendlyAddress } from "@tonconnect/ui-react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import styles from "./UserPage.module.css";


const formatAddress = (address: string, isTestnet: boolean) => {
  const friendly = toUserFriendlyAddress(address, isTestnet);
  return `${friendly.slice(0, 8)}...${friendly.slice(-8)}`;
};

export const UserPage = () => {
  const wallet = useTonWallet();
  const [tonBalance, setTonBalance] = useState<string | null>(null);
  const { state } = useUser();

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
            <p><strong>Кошелёк:</strong> {formatAddress(wallet.account.address, wallet.account.chain === CHAIN.TESTNET)}</p>
            <p><strong>Сеть:</strong> {wallet.account.chain === CHAIN.TESTNET ? "Testnet" : "Mainnet"}</p>
            <p><strong>Баланс:</strong> {tonBalance ?? 'Загрузка...'}</p>
          </>
        )}
      </div>

      {/* Кнопка подключения */}      <TonConnectButton />

      <div className={styles.user_wrapper}>
        <h2>Профиль</h2>
        <p><strong>Адрес:</strong> {state.address}</p>
        <p><strong>Prestige:</strong> {state.prestige}</p>
        <p><strong>Food:</strong> {state.food}</p>
        <p><strong>Wood:</strong> {state.wood}</p>
        <p><strong>Stone:</strong> {state.stone}</p>
        <p><strong>Iron:</strong> {state.iron}</p>
        <p><strong>Gold:</strong> {state.gold}</p>
        <p><strong>Doubloon:</strong> {state.doubloon}</p>
        <p><strong>Pearl:</strong> {state.pearl}</p>
      </div>
    </div>
  );
};
