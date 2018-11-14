import React from "react";
import style from "./footer.css";

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.info}>
        <h2>
          <p>Contact Us</p>
        </h2>
        <a href="https://www.google.com">Terms and Conditions</a>
        <p>
          <a href="https://www.safeway.com/ShopStores/Privacy-Policy.page">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
