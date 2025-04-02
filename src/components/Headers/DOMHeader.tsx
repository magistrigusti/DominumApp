// import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { Link } from "react-router-dom";
import styles from "./DOMHeader.module.css";

export const DOMHeader = () => {
  // const wallet = useTonWallet();
  // const isConnected = !!wallet?.account?.address;

  return (
    <div>
      <div className={styles.user_header_wrapper}>
        <Link className={styles.user_link} to="/user">
          <img className={styles.user_img}
              src="/icons/user-icon.png"
              alt="User Profile"
          />

          <p>Magistru</p>
        </Link>

        <Link to="/" style={{
          textDecoration: 'none',
          color: '#fff',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span style={{ fontSize: '1.5rem' }}>←</span> Назад
        </Link>

      </div>
    </div>
  );
};
