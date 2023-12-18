import React, { useState } from "react";
import styles from "./index.module.css";

const Burger = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBurger = () => {
    setIsOpen(!isOpen);
    onClick(!isOpen);
  };

  return (
    <div
      className={`${styles.burger} ${isOpen ? styles.open : ""}`}
      onClick={toggleBurger}
    >
      <div className={styles.burgerLine}></div>
      <div className={styles.burgerLine}></div>
      <div className={styles.burgerLine}></div>
    </div>
  );
};

export default Burger;
