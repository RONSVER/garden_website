// NavBar.js
import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

function ModalNavBar() {
  return (
    <div className={styles.mainDivModal}>
      <ul className={`${styles.ulNavModal}`}>
        <li className={styles.liNavModal}>
          <Link className={styles.linkModal} to="/">
            Main Page
          </Link>
        </li>
        <li className={styles.liNavModal}>
          <Link className={styles.linkModal} to="/categories">
            Categories
          </Link>
        </li>
        <li className={styles.liNavModal}>
          <Link className={styles.linkModal} to="/products">
            All products
          </Link>
        </li>
        <li className={styles.liNavModal}>
          <Link className={styles.linkModal} to="/sales">
            All sales
          </Link>
        </li>

        <li className={styles.liNavModal}>
          <Link className={styles.linkModal} to="/cart">
            Cart
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ModalNavBar;
