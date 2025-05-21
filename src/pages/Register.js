import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmailInput from "../components/login/EmailInput";
import RPasswordInput from "../components/register/RPasswordInrut";
import Footer from "../components/main/Footer";

import "../styles/Login.css";
import HeaderN from "../components/login/HeaderN";
import Photo5 from "../assets/Photo5.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [message, setMessage] = useState("");

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
    const onlyLettersAndDigits = /^[A-Za-z0-9]*$/.test(value);

    setPasswordValid(
      isValidLength &&
        notOnlySpaces &&
        hasNumber &&
        hasUppercase &&
        onlyLettersAndDigits
    );
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
      setMessage(data.message);

      if (res.ok) {
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error(err);
      setMessage("Registration failed. Try again.");
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

            <RPasswordInput
              value={password}
              onChange={handlePasswordChange}
              isValid={passwordValid}
            />

            <button
              type="submit"
              className="btnL"
              disabled={!emailValid || !passwordValid || !email || !password}
            >
              Register!
            </button>
            {message && <p className="messg">{message}</p>}

            <p className="register-link">
              <Link to="/login" id="a1">
                Already have an account? Log In
              </Link>
            </p>
          </form>
        </div>
        <img src={Photo5} alt="Photo5" className="photo4"></img>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
