
import { Link } from "react-router-dom";
import styles from "./DOMFooter.module.css";

export const DOMFooter = () => {

  return (
    <div className={styles.footer_container}>

      <div className={styles.user_header_wrapper}>
        <Link className={styles.user_link} to="">
          <img className={styles.footer_img_button} 
            src="/public/button/lordButton.jpg" alt="" 
          />
        </Link>

        <Link className={styles.user_link} to="">
          <img className={styles.footer_img_button} 
            src="/public/button/lordButton.jpg" alt="" 
          />
        </Link>

        <Link className={styles.user_link} to="">
          <img className={styles.footer_img_button} 
            src="/public/button/lordButton.jpg" alt="" 
          />
        </Link>

        <Link className={styles.user_link} to="">
          <img className={styles.footer_img_button} 
            src="/public/button/lordButton.jpg" alt="" 
          />
        </Link>

        <Link className={styles.user_link} to="">
          <img className={styles.footer_img_button} 
            src="/public/button/lordButton.jpg" alt="" 
          />
        </Link>
      </div>
    </div>
  );
};
