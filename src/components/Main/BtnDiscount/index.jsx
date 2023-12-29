import React from "react";
import styles from "./index.module.css";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

function BtnDiscount() {
  const scrollToSale = () => {
    scroll.scrollTo("saleSection", {
      smooth: true,
      duration: 500,
    });
  };

  return (
    <div className={styles.divDiscountBtn}>
      <div className={styles.secondDiv}>
        <h2 className={styles.h2DiscountBtn}>
          Amazing Discounts on Garden Products!
        </h2>

        <ScrollLink to="saleSection" smooth={true} duration={500}>
          <button className={styles.btnDiscount}>Check out</button>
        </ScrollLink>
      </div>
    </div>
  );
}

export default BtnDiscount;
