import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { orderRequest } from "../../store/slices/orderSlice";
import { addToCard, countMinus, countPlus } from "../../store/slices/cartSlice";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { getAllCategories } from "../../store/slices/categoriesSlice";

function OrderPage() {
  const { id } = useParams();
  const orderData = useSelector((state) => state.order.list);
  const cart = useSelector((state) => state.cart.list);
  const namingCategory = useSelector((state) => state.naming.nameOne);
  const namingLinks = useSelector((state) => state.naming.nameTwo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderRequest(id));
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.upperBtnsBox}>
        <button className={styles.btnUpper}>
          <Link className={styles.linksPage} to="/">
            Main page
          </Link>
        </button>
        <div className={styles.lineRightPage}></div>
        <button className={styles.btnUpper}>
          <Link className={styles.linksPage} to="/categories">
            categories
          </Link>
        </button>
        <div className={styles.lineRightPage}></div>

        <button className={styles.btnUpper}>
          <Link className={styles.linksPage} to={`${namingLinks}`}>
            {namingCategory}
          </Link>
        </button>
        <div className={styles.lineRightPage}></div>
        <button className={styles.btnUpper}>
          {orderData.map((el) =>
            el.title.length > 10 ? el.title.slice(0, 10) + "..." : el.title
          )}
        </button>
      </div>
      {orderData.map((el) => (
        <div key={el.id} className={styles.orderDiv}>
          <img
            className={styles.imgOrder}
            src={`http://localhost:3333${el.image}`}
            alt="imgOrder"
          />
          <div className={styles.infoDiv}>
            <h2 className={styles.h2Order}>{el.title}</h2>
            <div className={styles.priceBox}>
              <span className={styles.orderPrice}>{`$${el.price}`}</span>
              {el.discont_price ? (
                <span className={styles.orderDiscountPrice}>
                  {`$${el.discont_price}`}
                </span>
              ) : (
                ""
              )}

              {el.discont_price ? (
                <span className={styles.discountCount}>
                  -
                  {Math.floor(((el.price - el.discont_price) / el.price) * 100)}
                  %
                </span>
              ) : (
                ""
              )}
            </div>

            <div className={styles.btnBox}>
              <div
                className={
                  cart.find((el) => el.id == id)
                    ? styles.infoCount
                    : styles.displayNone
                }
              >
                <button
                  className={styles.btnCount}
                  onClick={() => dispatch(countMinus(el.id))}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <p className={styles.pOrder}>
                  {cart.map((el) => (el.id === +id ? el.count : ""))}
                </p>
                <button
                  className={styles.btnCount}
                  onClick={() => dispatch(countPlus(el.id))}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>

              <button
                onClick={() => dispatch(addToCard(el))}
                className={styles.btnAddCard}
              >
                Add to cart
              </button>
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
