import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { orderRequest } from "../../store/slices/orderSlice";
import { countMinus, countPlus } from "../../store/slices/cartSlice";
import styles from "./index.module.css";

function OrderPage() {
  const { id } = useParams();
  const orderData = useSelector((state) => state.order.list);
  const dispatch = useDispatch();
  console.log(orderData);

  useEffect(() => {
    dispatch(orderRequest(id));
  }, [dispatch]);

  return (
    <div>
      {orderData.map((el) => (
        <div className={styles.orderDiv}>
          <img
            className={styles.imgClass}
            src={`http://localhost:3333${el.image}`}
            alt="imgOrder"
          />
          <div className={styles.infoDiv}>
            <h2 className={styles.h2Order}>{el.title}</h2>
            <div className={styles.priceBox}>
              <span className={styles.orderPrice}>{el.price}</span>
              <span className={styles.orderDiscontPrice}>
                {el.discont_price}
              </span>
              <span className={styles.discountCount}>
                -{Math.floor(((el.price - el.discont_price) / el.price) * 100)}%
              </span>
            </div>

            <div className={styles.btnBox}>
              <div className={styles.infoCount}>
                <button
                  className={styles.btnCount}
                  onClick={() => dispatch(countMinus(id))}
                ></button>
                <p className={styles.pOrder}>count</p>
                <button
                  className={styles.btnCount}
                  onClick={() => dispatch(countPlus(id))}
                ></button>
              </div>

              <button className={styles.btnAddCard}>Add to cart</button>
            </div>

            <div className={styles.descriptionBox}>
              <h2 className={styles.description}>Description</h2>
              <p className={styles.descriptionP}>{el.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderPage;
