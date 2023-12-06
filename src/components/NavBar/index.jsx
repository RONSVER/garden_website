import logoSvg from "./assets/logo (1).svg";
import cartSvg from "./assets/cart.svg";
import styles from "./index.module.css";

function NavBar() {
  return (
    <div className={styles.navBarDiv}>
      <img className={styles.logo} src={logoSvg} alt="Logo" />
      <ul className={styles.ulNav}>
        <li className={styles.liNav}>Main Page</li>
        <li className={styles.liNav}>Categories</li>
        <li className={styles.liNav}>All products</li>
        <li className={styles.liNav}>All sales</li>
      </ul>
      <img className={styles.cartLogo} src={cartSvg} alt="Logo" />
    </div>
  );
}

export default NavBar;
