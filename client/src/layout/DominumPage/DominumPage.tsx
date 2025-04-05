import styles from "./DominumPage.module.css";
import { DOMHeader } from "../../components/Headers/DOMHeader";
import { DOMFooter } from "../../components/DOMFooter/DOMFooter";

export const DominumPage = () => {
  return (
    <div className={styles.page_wrapper}>
      <DOMHeader />
      <div className={styles.page_content}>
        <img src="/Dominum/ship-1.jpg" alt="icon" />
      </div>
      <DOMFooter />
    </div>
  );
};