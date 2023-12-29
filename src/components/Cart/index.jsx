import React, { useState } from "react";
import CartItem from "../CartItem";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import { postFetch } from "../Main/InputsDiscount";
import { Link } from "react-router-dom";

function Cart() {
  const [pError, setPError] = useState("");
  const [oneInputValue, setOneInputValue] = useState("");
  const [twoInputValue, setTwoInputValue] = useState("");
  const [threeInputValue, setThreeInputValue] = useState("");
  const [errorState, setErrorState] = useState("");
  const regexNum = /\d+(\.\d+)?/g;
  const regexLetter = /\p{L}+/gu;
  const regexLatin = /^[а-яА-ЯёЁ]+$/u;
  const regexGmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cart = useSelector((state) => state.cart.list);
  const totalSum = cart
    .reduce(
      (acc, el) =>
        el.discont_price
          ? acc + el.discont_price * el.count
          : acc + el.price * el.count,
      0
    )
    .toFixed(2);

  function handleChangeInputOne(event) {
    let value = event.target.value;
    setOneInputValue(value);
  }

  function handleChangeInputTwo(event) {
    return setTwoInputValue(event.target.value);
  }

  function handleChangeInputThree(event) {
    return setThreeInputValue(event.target.value);
  }

  const validateInput = (e) => {
    e.preventDefault();

    if (!oneInputValue.trim()) {
      setPError("Please fill in the field!");
    } else if (oneInputValue.match(regexNum)) {
      setPError("Please remove the numbers from the first field!");
    } else if (!twoInputValue.trim()) {
      setPError("Please fill in the field");
    } else if (twoInputValue.match(regexLetter)) {
      setPError("Please remove the letters from the second field!");
    } else if (!threeInputValue.trim()) {
      setPError("Please fill in the field!");
    } else if (threeInputValue.match(regexLatin)) {
      setPError("Enter English letters!");
    } else if (!threeInputValue.match(regexGmail)) {
      setPError("This not gmail!");
    } else {
      setPError("Great you have a discount!");
      const requestData = {
        name: oneInputValue,
        phone: twoInputValue,
        email: threeInputValue,
      };

      postFetch(
        "http://localhost:3333/sale/send",
        "application/json",
        JSON.stringify(requestData),
        setErrorState
      );
    }
  };

  return (
    <div className={styles.mainCart}>
      <div className={styles.divUpCart}>
        <h2 className={styles.h2Cart}>Shopping cart</h2>
        <div className={styles.lineRight}></div>

        <button className={styles.btnBackStore}>
          <Link to="/products" className={styles.links}>
            Back to the store
          </Link>
        </button>
      </div>

      <div
        className={cart.length > 0 ? styles.allOrdresInfo : styles.clearCart}
      >
        {cart.length > 0 ? (
          <>
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
                <h2 className={styles.orderH2}>{`$${
                  totalSum ? totalSum : ""
                }`}</h2>
              </div>

              <form className={styles.inputsOrdersBox}>
                <p>{pError}</p>

                <input
                  className={styles.inputsOrders}
                  type="text"
                  placeholder="Name"
                  value={oneInputValue}
                  onChange={handleChangeInputOne}
                />
                <input
                  className={styles.inputsOrders}
                  type="text"
                  placeholder="Phone number"
                  value={twoInputValue}
                  onChange={handleChangeInputTwo}
                />
                <input
                  className={styles.inputsOrders}
                  type="text"
                  placeholder="Email"
                  value={threeInputValue}
                  onChange={handleChangeInputThree}
                />

                <button
                  type="submit"
                  className={styles.btnOrder}
                  onClick={validateInput}
                >
                  Order
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className={styles.emptyCartDiv}>
            <p className={styles.emptyCartP}>
              Looks like you have no items in your basket currently.
            </p>
            <button className={`${styles.btnOrder}  ${styles.emptyBtn}`}>
              <Link to="/products" className={`${styles.btnContinueShop}`}>
                Continue Shopping
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
