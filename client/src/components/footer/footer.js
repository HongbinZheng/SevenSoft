import React from "react";
import style from "./footer.css";

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.info}>
        <h2>
          <p>Contact Us</p>
        </h2>
        <a href="/terms">Terms and Conditions</a>
        <p>
          <a href="/privacy">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
