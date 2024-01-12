import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  includesCheked,
  includesSort,
  prodByCategoriesRequest,
  setMaxPrice,
  setMinPrice,
} from "../../store/slices/prodByCategoriesSlice";
import styles from "./index.module.css";
import { addToCard } from "../../store/slices/cartSlice";

function AllProductsByCategoriesPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const prodByCategoriesData = useSelector(
    (state) => state.prodBycategories.list.data.data
  );

  const isChecked = useSelector((state) => state.prodBycategories.isChecked);

  const sortBy = useSelector((state) => state.prodBycategories.sortBy);

  useEffect(() => {
    dispatch(prodByCategoriesRequest(id));
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.categoriesList);

  const category = categories.find((cat) => cat.id === parseInt(id, 10));

  const categoryTitle = category ? category.title : "";

  return (
    <div>
      <div className={styles.btnsBox}>
        <button className={styles.btnAllSale}>
          <Link className={styles.linksPageSale} to="/">
            Main page
          </Link>
        </button>
        <div className={styles.lineRightPage}></div>
        <button className={styles.btnAllSale}>
          <Link className={styles.linksPageSale} to="/categories">
            categories
          </Link>
        </button>
        <div className={styles.lineRightPage}></div>

        <button className={styles.btnAllSale}>{categoryTitle}</button>
      </div>

      <div id="saleSection" className={styles.divSaleMain}>
        <div id="saleSection" className={styles.divSaleMain}>
          <div className={styles.divSale}>
            <h2 className={styles.h2Sale}>{categoryTitle}</h2>
          </div>
        </div>
      </div>

      <div className={styles.sortParamDiv}>
        <div className={styles.inputsDiv}>
          <span className={styles.spanPriceSort}>Price</span>

          <input
            className={styles.inputSort}
            type="number"
            placeholder={"from"}
            min="0"
            onChange={(event) =>
              dispatch(setMinPrice(Number(event.target.value)))
            }
          />
          <input
            className={styles.inputSort}
            type="number"
            placeholder={"to"}
            min="0"
            onChange={(event) =>
              dispatch(setMaxPrice(Number(event.target.value)))
            }
          />

          <div className={styles.checkBoxDiv}>
            <label className={styles.spanPriceSort} htmlFor="myCheckbox">
              Discounted items
            </label>
            <input
              type="checkbox"
              id="myCheckbox"
              checked={isChecked}
              onChange={() => {
                dispatch(includesCheked(prodByCategoriesData));
              }}
              className={styles.checkboxInput}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="14"
              viewBox="0 0 448 512"
              className={styles.iconChecked}
            >
              <path
                fill="#ffffff"
                d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
              />
            </svg>
          </div>
        </div>

        <div className={styles.listDiv}>
          <span className={styles.spanPriceSort}>Sorted</span>

          <select
            className={styles.selector}
            id="sortBy"
            value={sortBy}
            onChange={(event) => dispatch(includesSort(event.target.value))}
          >
            <option className={styles.options} value="default">
              by default
            </option>
            <option className={styles.options} value="priceLowToHigh">
              price: low-high
            </option>
            <option className={styles.options} value="priceHighToLow">
              price: high-low
            </option>
          </select>
        </div>
      </div>

      {prodByCategoriesData ? (
        <div className={styles.prodByCategoriesCardDiv}>
          {prodByCategoriesData.map((el) => (
            <div
              key={el.id}
              className={`${styles.prodByCategoriesCard} ${styles.imageContainer}`}
            >
              <div className={styles.prodByCategoriesImageContainer}>
                <img
                  style={{
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                  className={styles.cardsProdByCategories}
                  src={`http://localhost:3333${el.image}`}
                  alt="imgCardProdByCategories"
                ></img>
                {el.discont_price && (
                  <span className={styles.prodByCategoriesDiscount}>
                    -
                    {Math.floor(
                      ((el.price - el.discont_price) / el.price) * 100
                    )}
                    %
                  </span>
                )}

                <h3 className={styles.h3ProdByCategories}>
                  {el.title.length <= 28
                    ? el.title
                    : el.title.slice(0, 28) + "..."}
                </h3>

                {el.discont_price ? (
                  <span className={styles.spanPrice}>${el.discont_price}</span>
                ) : (
                  ""
                )}
                <span
                  className={
                    el.discont_price
                      ? styles.spanOriginalPrice
                      : styles.spanAllProductPrice
                  }
                >
                  ${el.price}
                </span>

                <button
                  onClick={() => dispatch(addToCard(el))}
                  className={styles.imageButton}
                >
                  add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AllProductsByCategoriesPage;
