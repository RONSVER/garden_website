import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCard } from "../../store/slices/cartSlice";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { saleRequest } from "../../store/slices/saleSlice";

function AllProducts() {
  const dispatch = useDispatch();
  const prodData = useSelector((state) => state.sale.saleList);
  const [isChecked, setChecked] = useState(false);
  const discountArr = isChecked
    ? prodData.filter((el) => el.discont_price)
    : prodData;

  const [filterPrice, setFilterPrices] = useState({
    minPrice: 0,
    maxPrice: 0,
  });

  const [sortBy, setSortBy] = useState("by default");
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filterData = discountArr.filter(
    (el) =>
      (!filterPrice.minPrice || el.price >= filterPrice.minPrice) &&
      (!filterPrice.maxPrice || el.price <= filterPrice.maxPrice)
  );

  const finalArr =
    sortBy === "priceLowToHigh"
      ? filterData.sort((a, b) => a.price - b.price)
      : sortBy === "priceHighToLow"
      ? filterData.sort((a, b) => b.price - a.price)
      : filterData;

  useEffect(() => {
    dispatch(saleRequest());
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
              setFilterPrices({
                ...filterPrice,
                minPrice: Number(event.target.value),
              })
            }
          />
          <input
            className={styles.inputSort}
            type="number"
            placeholder={"to"}
            min="0"
            onChange={(event) =>
              setFilterPrices({
                ...filterPrice,
                maxPrice: Number(event.target.value),
              })
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
                setChecked(!isChecked);
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
            onChange={handleSortChange}
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
        {finalArr.map((el) => (
          <div className={`${styles.saleCard} ${styles.imageContainer}`}>
            <div className={styles.saleImageContainer}>
              <Link key={el.id} to={`/products/${el.id}`}>
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
