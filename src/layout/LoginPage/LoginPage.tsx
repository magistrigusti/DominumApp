import { TonConnectButton } from "@tonconnect/ui-react";
import { Header } from "../../components/Headers/Header";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  return (
    <div className={styles.login_bg_wrapper}>
      <div>
        <Header />

        <h4 className={styles.login_title}>Dominum Space</h4>

        <img src="/img/contract_actral_island.png" alt="" />

        <p className={styles.login_text}>
          You won't get through here unless <br />
          you use a crypto wallet as a key.
        </p>

        <div>
          <TonConnectButton />
        </div>
      </div>
    </div>
  );
};
