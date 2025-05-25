import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Content.css";
import photo1 from "../../assets/photo1.png";
import cloud from "../../assets/cloud.png";
const Content = () => {
  return (
    <div className="conteiner1">
      <div className="content-area1">
        <div className="text-area">
          <div className="text">
            <h1 className="title1">
              Secure Your Digital Life — <br /> Smarter Password Management
              Starts Here
            </h1>
            <p className="text">
              Many people continue to use weak or reused passwords. That's why
              we've developed a powerful password manager to protect your
              sensitive data. <br />
              Our platform enables you to generate, store, and manage strong
              passwords with AES-256 encryption and two-factor authentication —
              all in one secure place.
            </p>
          </div>
          <div className="cloudC">
            <button className="png-button">
              <Link to="/register" className="logoT ">
                <img src={cloud} alt="cloud" className="cloud" />
              </Link>
              <span>
                <Link to="/register" className="logoT ">
                  Get Started
                </Link>
              </span>
            </button>
          </div>
        </div>
        <img src={photo1} alt="photo1" className="photo1" />
      </div>
      <div className="info-line">
        <div className="card">
          <h2 className="card-title">Generate Strong Passwords</h2>
          <p className="card-description">
            Create unique, ultra-secure passwords tailored to your needs — all
            with a single click.
          </p>
        </div>
        <div className="card">
          <h2 className="card-title">Store Them Securely</h2>
          <p className="card-description">
            AES-256 encryption keeps your passwords safe in the cloud.
          </p>
        </div>
        <div className="card">
          <h2 className="card-title">Stay Notified, Stay Safe</h2>
          <p className="card-description">
            Receive instant alerts about suspicious activity — because your
            security matters.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Content;
