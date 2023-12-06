import backgroundImg from "./assets/discountBtnImg.svg";

import styles from "./index.module.css";

function btnDiscount() {
  return (
    <div
      className={styles.divDiscountBtn}
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className={styles.secondDiv}>
        <h2 className={styles.h2DiscountBtn}>
          Amazing Discounts on Garden Products!
        </h2>

        <button className={styles.btnDiscount}>Check out</button>
      </div>
    </div>
  );
}

export default btnDiscount;
