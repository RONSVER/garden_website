import React, { useState, useEffect } from "react";
import logoSvg from "./assets/logo (1).svg";
import cartSvg from "./assets/cart.svg";
import styles from "./index.module.css";
import Burger from "./Burger";
import ModalNavBar from "./ModalNavBar/ModalNavBar";
import { Link } from "react-router-dom";

function NavBar() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [shouldShowNavBar, setShouldShowNavBar] = useState(true);

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShouldShowNavBar(currentScrollY < 535);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${styles.navBarDiv} ${
        !shouldShowNavBar ? styles.hidden : ""
      }`}
    >
      <Link to="/">
        <img className={styles.logo} src={logoSvg} alt="Logo" />
      </Link>

      <ul className={`${styles.ulNav} ${isBurgerOpen ? styles.openNav : ""}`}>
        <li className={styles.liNav}>
          <Link className={styles.linksNavBar} to="/">
            Main Page
          </Link>
        </li>
        <li className={styles.liNav}>
          <Link className={styles.linksNavBar} to="/categories">
            Categories
          </Link>
        </li>
        <li className={styles.liNav}>
          <Link className={styles.linksNavBar} to="/products">
            All products
          </Link>
        </li>
        <li className={styles.liNav}>
          <Link className={styles.linksNavBar} to="/sales">
            All sales
          </Link>
        </li>
      </ul>

      <Link to="/cart">
        <img className={styles.cartLogo} src={cartSvg} alt="Logo" />
      </Link>

      <div className={styles.addaptivMain}>
        <Burger onClick={toggleBurgerMenu} />

        {isBurgerOpen && <ModalNavBar className={styles.modalNav} />}
      </div>
    </div>
  );
}

export default NavBar;
