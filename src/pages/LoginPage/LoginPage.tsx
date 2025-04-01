import { TonConnectButton } from "@tonconnect/ui-react";
import ImgContract from "../../assets/contract_actral_island.png";
import { Header } from "../../components/Header";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  return (
    <div>
      <Header /> {/* Только в LoginPage */}
      <TonConnectButton />

      <h4 className={styles.login_title}>Dominum Space</h4>

      <img src={ImgContract} alt="" />

      <p className={styles.login_text}>
        You won't get through here unless <br />
        you use a crypto wallet as a key.
      </p>

      
    </div>
  );
};
