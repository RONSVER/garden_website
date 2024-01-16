import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCard } from "../../store/slices/cartSlice";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { saleRequest } from "../../store/slices/saleSlice";
import { setNames } from "../../store/slices/namingSlice";
import {
  filterRequest,
  includesChekedFilter,
  includesSortFilter,
  setMaxPriceFilter,
  setMinPriceFilter,
} from "../../store/slices/filterSlice";

function AllProducts() {
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.filter.list.data);
  const isChecked = useSelector((state) => state.filter.isChecked);
  const sortBy = useSelector((state) => state.filter.sortBy);

  useEffect(() => {
    dispatch(saleRequest());
    dispatch(filterRequest("http://localhost:3333/products/all"));
  }, [dispatch]);

  return (
    <div className={styles.divSaleMain}>
      <div className={styles.btnsBox}>
        <button className={styles.btnSale}>
          <Link className={styles.linksPageSale} to="/">
            Main page
          </Link>
        </button>
        <div className={styles.lineRightPage}></div>
        <button className={styles.btnSale}>All products</button>
      </div>

      <div id="saleSection" className={styles.divSaleMain}>
        <div className={styles.divSale}>
          <h2 className={styles.h2Sale}>All products</h2>
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
              dispatch(setMinPriceFilter(Number(event.target.value)))
            }
          />
          <input
            className={styles.inputSort}
            type="number"
            placeholder={"to"}
            min="0"
            onChange={(event) =>
              dispatch(setMaxPriceFilter(Number(event.target.value)))
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
                dispatch(includesChekedFilter(isChecked));
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
            onChange={(event) =>
              dispatch(includesSortFilter(event.target.value))
            }
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

      <div className={styles.saleCardDivShow}>
        {listData.map((el) => (
          <div
            key={el.id}
            className={`${styles.saleCard} ${styles.imageContainer}`}
          >
            <div className={styles.saleImageContainer}>
              <Link
                onClick={() =>
                  dispatch(
                    setNames({ nameOne: "all products", nameTwo: "/products" })
                  )
                }
                to={`/products/${el.id}`}
              >
                <img
                  style={{
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                  className={styles.cardsSale}
                  src={`http://localhost:3333${el.image}`}
                  alt="imgCardSale"
                ></img>
              </Link>
              {el.discont_price && (
                <span className={styles.saleDiscount}>
                  -
                  {Math.floor(((el.price - el.discont_price) / el.price) * 100)}
                  %
                </span>
              )}

              <h3 className={styles.h3Cards}>
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
    </div>
  );
}

export default AllProducts;
