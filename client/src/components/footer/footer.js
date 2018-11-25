import React from "react";
import style from "./footer.css";
import ContactForm from "./contactForm.js";
import Popup from "reactjs-popup";

const Footer = () => {
  return (
    <div className={style.footer} style={{ fontFamily: "Lucida Handwriting" }}>
      <div className={style.info}>
        <div>
          <Popup
            trigger={
              <button
                style={{
                  fontFamily: "Lucida Handwriting",
                  boxShadow: "0 10px 20px -8px rgba(0, 0, 0,.7)",
                  fontSize: 15
                }}
                className="btn btn-info"
              >
                {" "}
                Contact Us
              </button>
            }
            modal
            contentStyle={{ width: "500px",height:"500px" }}
          >
            <div style={{ fontFamily: "Lucida Handwriting"}}>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#login"
                    role="tab"
                    aria-controls="login"
                    aria-selected="true"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
                  <ContactForm />
            </div>
          </Popup>
          <br/>
          <br/>
        </div>
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
