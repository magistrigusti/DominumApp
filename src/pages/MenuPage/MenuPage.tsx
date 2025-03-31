
import { TonConnectButton } from "@tonconnect/ui-react";
import { useNavigate } from "react-router-dom";
import styles from "./MenuPage.module.css";

export const MenuPage = () => {
  const navigate = useNavigate();
  const goTo = (path: string) => () => navigate(path);

  return (
    <div className={styles.memu_containte} >
      <TonConnectButton />
      <h2>Welcome to the crypto space Dominum which is the entrance to the crypto meta universe Allodium</h2>

      <div className={styles.icon_grid}>
      <img
          src="/icons/iconsDominum.png"
          alt="Dominum"
          className={styles.icon}
          onClick={goTo("/dominum")}
        />
        <img
          src="/icons/iconsMercatus.png"
          alt="Portal"
          className={styles.icon}
          onClick={goTo("/mercatus")}
        />
        <img
          src="/icons/iconsMagisterium.png"
          alt="Magisterium"
          className={styles.icon}
          onClick={goTo("/magisterium")}
        />
                <img
          src="/icons/iconsPortale.png"
          alt="Portal"
          className={styles.icon}
          onClick={goTo("/portal")}
        />
      </div>
    </div>
  )
}