import styles from "./index.module.css";
import mapFooter from "./assets/map.svg";
import inst from "./assets/ic-instagram.svg";
import whatsapp from "./assets/ic-whatsapp.svg";

function Footer() {
  return (
    <div className={styles.divFooter}>
      <h2 className={styles.h2Footer}>Contact</h2>
      <div className={styles.footerMainBoxContacts}>
        <div className={`${styles.footerBoxsContactsLong} ${styles.phone}`}>
          <span className={styles.spanNamingFooter}>Phone</span>
          <a href="tel:+49999999999" className={styles.pFooter}>
            +49 999 999 99 99
          </a>
        </div>
        <div className={`${styles.footerBoxsContactsShort} ${styles.social}`}>
          <span className={styles.spanNamingFooter}>Socials</span>
          <div className={styles.linkApps}>
            <a href="https://www.instagram.com">
              <img className={styles.insta} src={inst} alt="instagram" />
            </a>
            <a href="https://web.whatsapp.com">
              <img className={styles.whatsapp} src={whatsapp} alt="whatsapp" />
            </a>
          </div>
        </div>

        <div
          className={`${styles.address} ${styles.footerBoxsContactsLong} ${styles.addressDiv}`}
        >
          <span className={styles.spanNamingFooter}>Address</span>

          <p className={`${styles.pFooter} ${styles.address} `}>
            Linkstraße 2, 8 OG, 10 785, Berlin,
          </p>
          <p className={styles.pFooter}>Deutschland</p>
        </div>
        <div className={`${styles.Hours} ${styles.footerBoxsContactsShort}`}>
          <span className={`${styles.pAddres} ${styles.spanNamingFooter}`}>
            Working Hours
          </span>
          <p className={styles.pFooter}>24 hours a day</p>
        </div>
      </div>
      <img className={styles.map} src={mapFooter} alt="map" />
    </div>
  );
}

export default Footer;
