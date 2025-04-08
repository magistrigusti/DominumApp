import Link from "next/link";
import styles from "./DOMFooter.module.css";

export const DOMFooter = () => {
  return (
    <div className={styles.footer_container}>
      <div className={styles.user_header_wrapper}>
        <Link className={styles.user_link} href="/">
          <img className={styles.footer_img_button} src="/button/lordButton.jpg" alt="" />
        </Link>

        <Link className={styles.user_link} href="/">
          <img className={styles.footer_img_button} src="/button/herosButton.jpg" alt="" />
        </Link>

        <Link className={styles.user_link} href="/">
          <img className={styles.footer_img_button} src="/button/inventoriButton.jpg" alt="" />
        </Link>

        <Link className={styles.user_link} href="/">
          <img className={styles.footer_img_button} src="/button/cityButton.jpg" alt="" />
        </Link>

        <Link className={styles.user_link} href="/">
          <img className={styles.footer_img_button} src="/button/allodsButton.jpg" alt="" />
        </Link>
      </div>
    </div>
  );
};
