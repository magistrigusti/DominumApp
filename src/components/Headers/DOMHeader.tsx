
import Link from "next/link";
import styles from "./DOMHeader.module.css";

export const DOMHeader = () => {

  return (
    <div style={{ display: "flex", alignItems: "center", width: "80%"}}>
      <div className={styles.user_header_wrapper}>
        <Link className={styles.user_link} href="/user">
          <img
            className={styles.user_img}
            src="/icons/user-icon.png"
            alt="User Profile"
          />
          <p>Magistru</p>
        </Link>

        <Link className={styles.user_link} href="/">
          <img className={styles.footer_img_button} src="/button/backButton.jpg" alt="" />
        </Link>
      </div>
    </div>
  );
};
