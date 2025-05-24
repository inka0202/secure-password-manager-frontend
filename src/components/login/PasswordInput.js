import React, { useState } from "react";
import "../../styles/Login.css";

const PasswordInput = ({ value, onChange, isValid }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <label htmlFor="passwordInput">Password:</label>
      <div className="password-wrapper">
        <input
          id="passwordInput"
          name="password"
          maxLength={128}
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={value}
          onChange={onChange}
          placeholder="Enter your password"
          className={value ? (!isValid ? "error" : "valid") : ""}
          required
        />

        <button
          type="button"
          onClick={togglePassword}
          className="toggle-password"
        >
          {showPassword ? "👁" : "👁"}
        </button>
      </div>
      {!isValid && (
        <p className="error-message">Password must be at least 8 characters</p>
      )}
    </>
  );
};

export default PasswordInput;
