import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

// import { getAllCategories } from "./requests/categoriesRequest";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../requests/categoriesRequest";

function Categories({ show }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categoriesList);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const slicesArr = show ? categories.slice(0, -1) : categories;

  return (
    <div className={styles.divCategoriesMain}>
      <div className={styles.divCategories}>
        <h2 className={styles.h2Categories}>Categories</h2>
        {show ? (
          <>
            <div className={styles.lineRight}></div>{" "}
            <button className={styles.btnAllCategories}>All categories</button>
          </>
        ) : (
          ""
        )}
      </div>

      <div className={styles.divMain}>
        {slicesArr.map((el) => (
          <div key={el.id} className={styles.divCard}>
            <img
              className={styles.photoCategories}
              src={`http://localhost:3333${el.image}`}
              alt={`Category ${el.id}`}
            />
            <p className={styles.NameP}>{el.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
