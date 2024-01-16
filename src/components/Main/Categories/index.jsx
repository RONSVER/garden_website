import React, { useEffect } from "react";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../../store/slices/categoriesSlice";

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
            <div className={styles.lineRight}></div>
            <button className={styles.btnAllCategories}>
              <Link className={styles.linkCategories} to="/categories">
                All categories
              </Link>
            </button>
          </>
        ) : (
          ""
        )}
      </div>

      <div className={styles.divMain}>
        {slicesArr.map((el) => (
          <Link
            key={el.id}
            className={styles.linkCategories}
            to={`/categories/${el.id}`}
          >
            <div className={styles.divCard}>
              <img
                className={styles.photoCategories}
                src={`http://localhost:3333${el.image}`}
                alt={`Category ${el.id}`}
              />
              <p className={styles.NameP}>{el.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
