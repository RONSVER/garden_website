import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

export async function getFetch(url, stateData) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    stateData(data);
  } catch (error) {
    console.error("Ошибка запроса:", error.message);
    throw error;
  }
}

function Categories() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getFetch("http://localhost:3333/categories/all", setCategoryData);
  }, []);

  return (
    <div className={styles.divCategoriesMain}>
      <div className={styles.divCategories}>
        <h2 className={styles.h2Categories}>Categories</h2>
        <div className={styles.lineRight}></div>
        <button className={styles.btnAllCategories}>All categories</button>
      </div>

      <div className={styles.divMain}>
        {categoryData.map((el) => (
          <div className={styles.divCard}>
            <img
              className={styles.photoCategories}
              key={el.id}
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
