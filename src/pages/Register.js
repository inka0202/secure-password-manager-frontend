import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmailInput from "../components/login/EmailInput";
import RegisterPasswordInput from "../components/register/RegisterPasswordInput";
import Footer from "../components/main/Footer";
import "../styles/Register.css";
import HeaderN from "../components/login/HeaderN";
import Photo5 from "../assets/Photo5.png";
import { generateStrongPassword } from "../components/manager/passwordGenerator";

const Register = () => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    document.getElementById("emailInput")?.focus();
  }, []);

  const validateEmail = (email) => {
    const re =
      /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
    return re.test(email);
  };

  const isEmailLengthValid = (email) =>
    email.length >= 6 && email.length <= 254;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(validateEmail(value) && isEmailLengthValid(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const isValidLength = value.length >= 8 && value.length <= 128;
    const notOnlySpaces = value.trim().length >= 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);

    const isValid = isValidLength && notOnlySpaces && hasNumber && hasUppercase;

    setPasswordValid(isValid);

    // Clear the success message if password becomes invalid
    if (!isValid && successMsg) setSuccessMsg("");
    if (errorMsg) setErrorMsg(""); // Clear error when editing password
  };

  const handleGeneratePassword = () => {
    const strongPass = generateStrongPassword();
    setPassword(strongPass);

    // Validate manually
    const isValidLength = strongPass.length >= 8 && strongPass.length <= 128;
    const notOnlySpaces = strongPass.trim().length >= 8;
    const hasUppercase = /[A-Z]/.test(strongPass);
    const hasNumber = /\d/.test(strongPass);

    const isValid = isValidLength && notOnlySpaces && hasNumber && hasUppercase;

    setPasswordValid(isValid);

    navigator.clipboard
      .writeText(strongPass)
      .then(() => {
        setSuccessMsg("Password generated and copied to clipboard!");
        setErrorMsg("");
        setTimeout(() => setSuccessMsg(""), 4000);
      })
      .catch(() => {
        setErrorMsg("Failed to copy password.");
        setSuccessMsg("");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg(data.message || "User registered successfully");
        setErrorMsg("");
        setEmail("");
        setPassword("");
      } else {
        setErrorMsg(data.message || "Registration failed. Try again.");
        setSuccessMsg("");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Registration failed. Try again.");
      setSuccessMsg("");
    }
  };

  return (
    <div className="screen">
      <HeaderN />
      <div className="content-area3">
        <div className="login-container">
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <EmailInput
              value={email}
              onChange={handleEmailChange}
              isValid={emailValid}
            />

            <RegisterPasswordInput
              value={password}
              onChange={handlePasswordChange}
              isValid={passwordValid}
            />

            {/* Success/Error message BELOW password field, above Generate button */}
            {(successMsg || errorMsg) && (
              <p className={successMsg ? "success-message" : "error-message"}>
                {successMsg || errorMsg}
              </p>
            )}

            <button
              type="button"
              className="gbtn"
              onClick={handleGeneratePassword}
            >
              Generate
            </button>

            <button
              type="submit"
              className="btnL"
              disabled={!emailValid || !passwordValid || !email || !password}
            >
              Register!
            </button>

            <p className="register-link">
              <Link to="/login" id="a1">
                Already have an account? Log In
              </Link>
            </p>
          </form>
        </div>
        <img src={Photo5} alt="Photo5" className="photo4" />
      </div>
      <Footer />
    </div>
  );
};

export default Register;
