import { TonConnectButton } from "@tonconnect/ui-react";
import { Header } from "../../components/Headers/Header";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  return (
    <div>
      <Header /> {/* Только в LoginPage */}
      <TonConnectButton />

      <h4 className={styles.login_title}>Dominum Space</h4>

      <img src="/public/img/contract_actral_island.png" alt="" />

      <p className={styles.login_text}>
        You won't get through here unless <br />
        you use a crypto wallet as a key.
      </p>

      
    </div>
  );
};
