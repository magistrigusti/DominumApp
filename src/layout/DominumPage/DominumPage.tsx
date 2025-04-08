import { RESOURCE_CONFIG } from "@/constants/resources";
import { useUser } from "@/context/UserContext";
import styles from "./DominumPage.module.css";
import { DOMHeader } from "../../components/Headers/DOMHeader";
import { DOMFooter } from "../../components/DOMFooter/DOMFooter";

export const DominumPage = () => {
  const { state } = useUser();
  
  return (
    <div className={styles.page_wrapper}>
      <DOMHeader />

      <div className={styles.icons_wrapper}>
        {RESOURCE_CONFIG.map((res) => (
          <div className={styles.resource_item} key={res.key}>
            <img src={res.icon} alt={res.label} />

            <span>{state[res.key]}</span>
          </div>
        ))}

      </div>

      <div className={styles.page_content}>
        <img src="/Dominum/ship-1.jpg" alt="icon" />
      </div>
      <DOMFooter />
    </div>
  );
};