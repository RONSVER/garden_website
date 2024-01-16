import React from "react";
import { useDispatch } from "react-redux";
import { countMinus, countPlus, funDelete } from "../../store/slices/cartSlice";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTimes } from "@fortawesome/free-solid-svg-icons";

function CartItem({ title, id, price, count, discont_price, image }) {
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.ordersCards}>
        <img
          className={styles.imgOrder}
          src={`http://localhost:3333${image}`}
          alt=""
        />
        <div className={styles.infoCards}>
          <div className={styles.upBoxCards}>
            <p className={styles.pTitle}>{title}</p>

            <span
              className={styles.btnDelete}
              onClick={() => dispatch(funDelete(id))}
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>

          <div className={styles.aboutProductDiv}>
            <div className={styles.countBox}>
              <button
                className={styles.btnCount}
                onClick={() => dispatch(countMinus(id))}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <p className={styles.pCount}>{count}</p>
              <button
                className={styles.btnCount}
                onClick={() => dispatch(countPlus(id))}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            {discont_price ? (
              <p className={styles.pDiscontPrice}>{`$${discont_price}`}</p>
            ) : (
              ""
            )}
            <p
              className={discont_price ? styles.pPrice : styles.pDonSalePrice}
            >{`$${price}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
