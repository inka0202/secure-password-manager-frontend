import React, { useState, useEffect } from "react";
import "../../styles/Login.css";

const RPasswordInput = ({ value, onChange, isValid, type = "password"}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    if (!value) {
      setValidationMessage("");
      return;
    }

    const validations = [
      {
        test: (v) => v.length >= 8,
        message: "Password must be at least 8 characters long."
      },
      {
        test: (v) => /[A-Z]/.test(v),
        message: "Password must contain at least one uppercase letter."
      },
      {
        test: (v) => /\d/.test(v),
        message: "Password must contain at least one number."
      },
      {
        test: (v) => !/\s/.test(v),
        message: "Password must not contain spaces."
      }
    ];

    const firstInvalid = validations.find((v) => !v.test(value));
    if (firstInvalid) {
      setValidationMessage(firstInvalid.message);
    } else {
      setValidationMessage("");
    }
  }, [value]);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="password-wrapper">
        <input
          id="passwordInput"
          name="password"
          maxLength={128}
          type={type}
          autoComplete="new-password"
          value={value}
          onChange={onChange}
          placeholder="Enter your password"
          className={value ? (!isValid ? "error" : "valid") : ""}
          required
        />
      </div>

      {validationMessage && (
        <p className="error-message">{validationMessage}</p>
      )}
    </>
  );
};

export default RPasswordInput;