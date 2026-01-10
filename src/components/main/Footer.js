import React from "react";
import "../../styles/Footer.css";
import gmailIcon from "../../assets/Gmail_Icon.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-contact">
          <p className="contact"> Contact us: </p>
          <div className="infoF">
            <img src={gmailIcon} alt="Gmail" className="gmail-icon" />
            <a href="mailto:securepm.team@gmail.com" className="email-link">
              - securepm.team@gmail.com
            </a>
          </div>
        </div>
      </div>
      <p className="copyright">
        &copy; {new Date().getFullYear()} Secure Password Manager. All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
