import React from "react";
import "../../styles/Footer.css";
import gmailIcon from "../../assets/Gmail_Icon.png"; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-contact">
          <p className="contact"> Contact us:  </p>
          <img src={gmailIcon} alt="Gmail" className="gmail-icon" />
          <a href="mailto:pochtan25@gmail.com" className="email-link">
            - pochtan25@gmail.com
          </a>
        </div>
      </div>
      <p className="copyright">
        &copy; {new Date().getFullYear()} Giggle Password Manager. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
