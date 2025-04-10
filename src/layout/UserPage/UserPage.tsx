import { useEffect, useState } from "react";
import { TonConnectButton, useTonWallet, CHAIN, toUserFriendlyAddress } from "@tonconnect/ui-react";
import Link from "next/link";
import { useUser } from "../../context/UserContext";
import styles from "./UserPage.module.css";
import { ResourcesBar } from "@/components/ResourcesBar/ResourcesBar";

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
    <div className={styles.user_container}>
      <div className={styles.user_header_wrapper}>

          <img className={styles.user_img}
            src={state.avatar}
            alt="User Profile"
          />
          <div>{wallet?.account?.address ? <p>{state.name}</p> : "Не подключено"}</div>
        
        <Link className={styles.user_link} href="/user/profileEditor">
          <img
            className={styles.edit_img}
            src="/icons/edit-user.png"
            alt=" Edit User Profile"
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center' }}>
        {wallet && (
          <div>
            <p><strong>Кошелёк:</strong> {formatAddress(wallet.account.address, wallet.account.chain === CHAIN.TESTNET)}</p>
            <p><strong>Сеть:</strong> {wallet.account.chain === CHAIN.TESTNET ? "Testnet" : "Mainnet"}</p>
            <p><strong>Баланс:</strong> {tonBalance ?? 'Загрузка...'}</p>
          </div>
        )}
      </div>
      <ResourcesBar />

      <div style={{ alignSelf: 'flex-start' }}>
        <Link className={styles.user_link} href="/">
          <img className={styles.back_button} src="/button/backButton.jpg" alt="" />
        </Link>
      </div>

      <TonConnectButton />
    </div>
  );
};
