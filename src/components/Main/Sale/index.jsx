import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCard } from "../../../store/slices/cartSlice";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { saleRequest } from "../../../store/slices/saleSlice";

const Sale = React.forwardRef(({ show }, ref) => {
  const saleRef = useRef(null);
  const dispatch = useDispatch();
  const saleData = useSelector((state) => state.sale.saleList);
  const [filterPrice, setFilterPrices] = useState({
    minPrice: 0,
    maxPrice: 0,
  });

  const [sortBy, setSortBy] = useState("by default");
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    dispatch(saleRequest());
  }, [dispatch]);

  useEffect(() => {
    if (ref) {
      ref.current = saleRef.current;
    }
  }, [ref]);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const fourArray = show
    ? saleData.filter((el) => el.discont_price).slice(0, 4)
    : saleData.filter((el) => el.discont_price);

  const sortedArr =
    fourArray.length > 4
      ? fourArray.filter(
          (el) =>
            (!filterPrice.minPrice ||
              el.discont_price >= filterPrice.minPrice) &&
            (!filterPrice.maxPrice || el.discont_price <= filterPrice.maxPrice)
        )
      : fourArray;

  const finalArr =
    sortBy === "priceLowToHigh"
      ? sortedArr.sort((a, b) => a.price - b.price)
      : sortBy === "priceHighToLow"
      ? sortedArr.sort((a, b) => b.price - a.price)
      : sortedArr;

  return (
    <div ref={saleRef} id="saleSection" className={styles.divSaleMain}>
      <div className={styles.divSale}>
        <h2
          className={
            show ? styles.h2Sale : `${styles.h2Sale} ${styles.h2AllSale}`
          }
        >
          {show ? "Sale" : "Discounted items"}
        </h2>
        {show ? <div className={styles.lineRight}></div> : ""}
        {show ? (
          <RouterLink to="/sales">
            <button className={styles.btnAllSale} onClick={scrollToTop}>
              All sales
            </button>
          </RouterLink>
        ) : (
          ""
        )}
      </div>

      {show ? (
        ""
      ) : (
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
      )}

      <div className={show ? styles.saleCardDiv : styles.saleCardDivShow}>
        {finalArr.map((el) => (
          <div
            key={el.id}
            className={`${styles.saleCard} ${styles.imageContainer}`}
          >
            <div className={styles.saleImageContainer}>
              <img
                style={{
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }}
                className={styles.cardsSale}
                src={`http://localhost:3333${el.image}`}
                alt="imgCardSale"
              ></img>
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

              <span className={styles.spanPrice}>${el.discont_price}</span>
              <span className={styles.spanOriginalPrice}>${el.price}</span>

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
});

export default Sale;
