import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmailInput from "../components/login/EmailInput";
import PasswordInput from "../components/login/PasswordInput";
import Footer from "../components/main/Footer";

import "../styles/Login.css";
import HeaderN from "../components/login/HeaderN";
import Photo4 from "../assets/Photo4.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  useEffect(() => {
    document.getElementById("emailInput")?.focus();
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(value.length >= 8);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailValid && passwordValid) {
      // тут би мав бути запит до бекенду для логіну
      console.log("Успішний вхід:", { email, password });
    }
  };

  return (
    <div className="screen">
      <HeaderN />
      <div className="content-area3">
        <img src={Photo4} alt="Photo4" className="photo4"></img>

        <div className="login-container">
          <h2>Log In to Your Account</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <EmailInput
              value={email}
              onChange={handleEmailChange}
              isValid={emailValid}
            />

            <PasswordInput
              value={password}
              onChange={handlePasswordChange}
              isValid={passwordValid}
            />

            <button
              type="submit"
              className="btnL"
              disabled={!emailValid || !passwordValid || !email || !password}
            >
              Log In!
            </button>

            <p className="register-link">
              <Link to="/register">Don't have an account? Register</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
