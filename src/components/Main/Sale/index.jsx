import React from "react";
import styles from "./index.module.css";

export default function Sale() {
  return (
    <div className={styles.divCategories}>
      <h2 className={styles.h2Categories}>Categories</h2>
      <div className={styles.lineRight}></div>
      <button className={styles.btnAllCategories}>All categories</button>
    </div>
  );
}
