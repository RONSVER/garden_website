import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCard } from "../../../store/slices/cartSlice";
import { Link, Link as RouterLink } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { setNames } from "../../../store/slices/namingSlice";
import {
  filterRequest,
  includesSortFilter,
  setMaxPriceFilter,
  setMinPriceFilter,
} from "../../../store/slices/filterSlice";

const Sale = React.forwardRef(({ show }, ref) => {
  const saleRef = useRef(null);
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.filter.sortBy);
  const listData = useSelector((state) => state.filter.list.data);

  useEffect(() => {
    dispatch(filterRequest("http://localhost:3333/products/all"));
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
    ? listData.filter((el) => el.discont_price).slice(0, 4)
    : listData.filter((el) => el.discont_price);

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
      )}

      <div className={show ? styles.saleCardDiv : styles.saleCardDivShow}>
        {fourArray.map((el) => (
          <div
            key={el.id}
            className={`${styles.saleCard} ${styles.imageContainer}`}
          >
            <div className={styles.saleImageContainer}>
              <Link
                onClick={() =>
                  dispatch(
                    setNames({ nameOne: "all sales", nameTwo: "/sales" })
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
