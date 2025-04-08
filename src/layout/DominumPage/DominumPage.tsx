import { ResourcesBar } from "@/components/ResourcesBar/ResourcesBar";
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
      <ResourcesBar />
      </div>

      <div className={styles.page_content}>
        <img src="/Dominum/ship-1.jpg" alt="icon" />
      </div>
      <DOMFooter />
    </div>
  );
};