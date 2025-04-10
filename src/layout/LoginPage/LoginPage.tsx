
import { Footer } from "../../components/DOMFooter/Footer";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  return (
    <div className={styles.login_bg_wrapper}>
      <div className={styles.login_inner}>
        <div>
          <h4 className={styles.login_title}>Dominum Space</h4>
          <img src="/img/contract_actral_island.png" alt="" />

          <p className={styles.login_text}>
            You won't get through here unless 
            you use a crypto wallet as a key.
          </p>
        </div>

        <Footer />
      </div>
    </div>

  );
};
