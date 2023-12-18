import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { saleRequest } from "../../../requests/saleRequest";
import { Link } from "react-router-dom";
import { addToCard } from "../../../store/slices/cartSlice";

export default function Sale({ show }) {
  const saleData = useSelector((state) => state.sale.saleList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(saleRequest());
  }, [dispatch]);

  const fourArray = show
    ? saleData.filter((el) => el.discont_price).slice(0, 4)
    : saleData.filter((el) => el.discont_price);

  return (
    <div className={styles.divSaleMain}>
      <div className={styles.divSale}>
        <h2 className={styles.h2Sale}>Sale</h2>
        <div className={styles.lineRight}></div>
        <button className={styles.btnAllSale}>
          <Link className={styles.linkSale} to="/sales">
            All sales
          </Link>
        </button>
      </div>

      <div className={show ? styles.saleCardDiv : styles.saleCardDivShow}>
        {fourArray.map((el) => (
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
}
