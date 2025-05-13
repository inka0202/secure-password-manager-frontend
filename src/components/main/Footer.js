import React from "react";
import "../../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="copyright">
        &copy; {new Date().getFullYear()} Secure. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
