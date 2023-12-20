import React from "react";
import CartItem from "../CartItem";
import { useSelector } from "react-redux";
import styles from "./index.module.css";

function Cart() {
  const cart = useSelector((state) => state.cart.list);
  const totalSum = cart
    .reduce((acc, el) => acc + el.price * el.count, 0)
    .toFixed(2);

  return (
    <div className={styles.mainCart}>
      <div className={styles.productsCart}>
        {cart.map((el) => (
          <CartItem key={el.id} {...el} />
        ))}
      </div>

      <div className={styles.orderMenu}>
        <h3 className={styles.orderH3}>Order details</h3>
        <div className={styles.infoOrder}>
          <p className={styles.pCart}>
            3 items <br /> Total
          </p>
          <h2 className={styles.orderH2}>{`$${totalSum ? totalSum : ""}`}</h2>
        </div>

        <div className={styles.inputsOrdersBox}>
          <input
            className={styles.inputsOrders}
            type="text"
            placeholder="Name"
          />
          <input
            className={styles.inputsOrders}
            type="text"
            placeholder="Phone number"
          />
          <input
            className={styles.inputsOrders}
            type="text"
            placeholder="Email"
          />
        </div>
        <button className={styles.btnOrder}>Order</button>
      </div>
    </div>
  );
}

export default Cart;
