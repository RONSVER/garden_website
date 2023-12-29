import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saleRequest } from "../../requests/saleRequest";
import { addToCard } from "../../store/slices/cartSlice";
import styles from "./index.module.css";

function AllProducts() {
  const dispatch = useDispatch();
  const prodData = useSelector((state) => state.sale.saleList);

  useEffect(() => {
    dispatch(saleRequest());
  }, [dispatch]);

  return (
    <div className={styles.divSaleMain}>
      <div className={styles.saleCardDivShow}>
        {prodData.map((el) => (
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
