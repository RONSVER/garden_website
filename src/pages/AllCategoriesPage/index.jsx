import React from "react";
import Categories from "../../components/Main/Categories";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

function AllCategoriesPage() {
  return (
    <div>
      <div className={styles.btnsBox}>
        <button className={styles.btnCategories}>
          <Link className={styles.linksPageCategories} to="/">
            Main page
          </Link>
        </button>
        <div className={styles.lineRightPage}></div>
        <button className={styles.btnCategories}>Categories</button>
      </div>
      <Categories />
    </div>
  );
}

export default AllCategoriesPage;
