import React from "react";
import styles from "./index.module.css";

function SuccessContent({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.textDivSuccess}>
          <div className={styles.upperSide}>
            <h3 className={styles.h3Success}>Congratulations!</h3>

            <svg
              onClick={onClose}
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              className={styles.closeIcon}
            >
              <path
                d="M33 11L11 33"
                stroke="white"
                strokeWidth="3.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 11L33 33"
                stroke="white"
                strokeWidth="3.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className={styles.pSuccess}>
            Your order has been successfully placed <br /> on the website.
          </p>
          <p className={styles.pSuccess}>
            A manager will contact you shortly <br /> to confirm your order.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SuccessContent;
