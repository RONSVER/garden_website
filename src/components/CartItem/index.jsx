import React from "react";
import { useDispatch } from "react-redux";
import { countMinus, countPlus, funDelete } from "../../store/slices/cartSlice";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

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
          <p className={styles.pTitle}>{title}</p>

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

            <p className={styles.pDiscontPrice}>{`$${discont_price}`}</p>
            <p className={styles.pPrice}>{`$${price}`}</p>
            <span
              className={styles.btnDelete}
              onClick={() => dispatch(funDelete(id))}
            >
              x
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
