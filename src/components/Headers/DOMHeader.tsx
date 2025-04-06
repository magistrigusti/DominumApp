// import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import Link from "next/link";
import styles from "./DOMHeader.module.css";

export const DOMHeader = () => {
  // const wallet = useTonWallet();
  // const isConnected = !!wallet?.account?.address;

  return (
    <div style={{ display: "flex", alignItems: "center", width: "80%"}}>
      <div className={styles.user_header_wrapper}>
        <Link className={styles.user_link} href="/user">
          <img
            className={styles.user_img}
            src="/icons/user-icon.png"
            alt="User Profile"
          />
          <p>Magistru</p>
        </Link>
      </div>
    </div>
  );
};
