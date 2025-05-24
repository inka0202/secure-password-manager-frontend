import React from "react";

const EmailInput = ({ value, onChange, isValid }) => (
  <>
    <label htmlFor="emailInput">Email:</label>
    <input
      id="emailInput"
      name="email"
      maxLength={254}
      minLength={6}
      type="email"
      autoComplete="email"
      value={value}
      onChange={onChange}
      placeholder="Enter your email"
      className={value ? (!isValid ? "error" : "valid") : ""}
      required
    />
    {!isValid && <p className="error-message">Please enter a valid email</p>}
  </>
);

export default EmailInput;
