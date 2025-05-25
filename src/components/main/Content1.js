import React from "react";
import "../../styles/Content1.css";
import Photo2 from "../../assets/Photo2.png";
import "../../styles/Content.css";

const Content1 = () => {
  return (
    <div className="content-area">
      <img src={Photo2} alt="photo2" className="photo2" />
      <div className="text-area5">
        <h1 className="title1">
          Advanced Encryption. Seamless Access. Complete Control.
        </h1>
        <p className="text">
          We protect your data with AES-256 encryption, secure your sessions
          with JWT, and verify logins using email-based two-factor
          authentication. <br />
          Whether you're a casual user or managing multiple accounts, you'll
          find our interface intuitive, responsive, and secure — from login to
          logout.
        </p>
      </div>
    </div>
  );
};
export default Content1;
