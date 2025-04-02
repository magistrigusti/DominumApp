import { TonConnectButton } from "@tonconnect/ui-react";
import { Link } from "react-router-dom";
import styles from "./UserPage.module.css";

export const UserPage = () => {
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

        <p>Magistru</p>
      </div>

      {/* 🔙 Кнопка назад */}
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

      {/* 🔐 Кнопка TonConnect */}
      <TonConnectButton />
    </div>
  );
};
