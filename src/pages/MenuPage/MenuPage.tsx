
import { useNavigate } from "react-router-dom";
import styles from "./MenuPage.module.css";
import { DOMHeader }from "../../components/Headers/DOMHeader.tsx";

export const MenuPage = () => {
  const navigate = useNavigate();
  const goTo = (path: string) => () => navigate(path);

  return (
    <div className={styles.memu_containte} >
      <DOMHeader />
      
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
          alt="mercatus"
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