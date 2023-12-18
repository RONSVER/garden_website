import React from "react";
import Sale from "../../components/Main/Sale";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

function AllProductsSalesPage() {
  return (
    <div>
      <div className={styles.btnsBox}>
        <button className={styles.btnSale}>
          <Link className={styles.linksPageSale} to="/">
            Main page
          </Link>
        </button>
        <div className={styles.lineRightPage}></div>
        <button className={styles.btnSale}>All sales</button>
      </div>

      <Sale />
    </div>
  );
}

export default AllProductsSalesPage;
