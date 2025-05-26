import React from "react";
import "../../styles/FeaturesGrid.css";

const FeaturesGrid = () => {
  return (
    <div className="features">
      <h2 className="title2">Powerful Features to Keep You Safe Online</h2>

      <div className="card-grid-container">
        <div className="cards">
          <h2 className="card-title">Encrypted Vault</h2>
          <p className="card-description">
            Your passwords are protected with AES-256 encryption — accessible
            only to you.
          </p>
        </div>

        <div className="cards">
          <h2 className="card-title">Two-Factor Authentication</h2>
          <p className="card-description">
            Add a second layer of protection with email-based two-factor
            authentication.
          </p>
        </div>

        <div className="cards">
          <h2 className="card-title">Password Strength Checker</h2>
          <p className="card-description">
            Get real-time feedback on your password strength as you type.
          </p>
        </div>

        <div className="cards">
          <h2 className="card-title">Security Alerts</h2>
          <p className="card-description">
            We track login activity and instantly alert you to anything
            suspicious.
          </p>
        </div>

        <div className="cards">
          <h2 className="card-title">Admin Dashboard</h2>
          <p className="card-description">
            Easily manage users and monitor access with full visibility.
          </p>
        </div>

        <div className="cards">
          <h2 className="card-title">Cross-Platform Access</h2>
          <p className="card-description">
            Access your vault anytime, from any device — desktop, mobile, or
            tablet.
          </p>
        </div>
      </div>
    </div>
  );
};
export default FeaturesGrid;