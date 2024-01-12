// NavBar.js
import React from "react";
import styles from "./index.module.css";
import notFoundImg from "./assets/404.svg";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className={styles.mainNotFound}>
      <img className={styles.notFoundImg} src={notFoundImg} alt="NotFound" />
      <div className={styles.messageBlock}>
        <h2 className={styles.h2NotFound}>Page Not Found</h2>
        <p className={styles.pNotFound}>
          We’re sorry, the page you requested could not be found.
        </p>
        <p className={styles.pNotFound}>Please go back to the homepage.</p>
        <button className={styles.btnDiscountInput}>
          <Link className={styles.link} to="/">
            Go Home
          </Link>
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
