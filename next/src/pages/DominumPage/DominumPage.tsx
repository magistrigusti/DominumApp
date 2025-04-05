import styles from "./DominumPage.module.css";
import { DOMHeader } from "../../components/Headers/DOMHeader";
import { DOMFooter } from "../../components/DOMFooter/DOMFooter";

export const DominumPage = () => {
  return (
    <div className={styles.page_wrapper}>
      <DOMHeader />

      <div className={styles.icons_wrapper}>
        <div className={styles.resource_item}>
          <img src="/icons/food.png" alt="food" />
          <span>120</span>
        </div>

        <div className={styles.resource_item}>
          <img src="/icons/wood.png" alt="wood" />
          <span>95</span>
        </div>

        <div className={styles.resource_item}>
          <img src="/icons/stone.png" alt="stone" />
          <span>87</span>
        </div>

        <div className={styles.resource_item}>
          <img src="/icons/iron.png" alt="iron" />
          <span>43</span>
        </div>

        <div className={styles.resource_item}>
          <img src="/icons/gold.png" alt="gold" />
          <span>12</span>
        </div>

        <div className={styles.resource_item}>
          <img src="/icons/doubloon.png" alt="doubloon" />
          <span>100</span>
        </div>

        <div className={styles.resource_item}>
          <img src="/icons/pearl.png" alt="pearl" />
          <span>56</span>
        </div>
      </div>

      <div className={styles.page_content}>
        <img src="/Dominum/ship-1.jpg" alt="icon" />
      </div>
      <DOMFooter />
    </div>
  );
};