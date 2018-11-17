import React from "react";
import style from "./footer.css";

const Footer = () => {
  return (
    <div className={style.footer} style={{fontFamily:'Lucida Handwriting'}}>
      <div className={style.info}>
        <h2>
          <p>Contact Us</p>
        </h2>
        <a href="/terms">Terms and Conditions</a>
        <p>
          <a href="/privacy">Privacy Policy</a>
        </p>
        <p>
          <a href="/maps">Locator</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
