import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmailInput from "../components/login/EmailInput";
import PasswordInput from "../components/login/PasswordInput";
import Footer from "../components/main/Footer";
import HeaderN from "../components/login/HeaderN";
import "../styles/Login.css";
import Photo4 from "../assets/Photo4.png";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
        <img src={Photo4} alt="Photo4" className="photo4" />

        <div className="login-container">
          <h2>Create an Account</h2>
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
              disabled={
                !emailValid || !passwordValid || !email || !password
              }
            >
              Register
            </button>

            {message && <p className="message">{message}</p>}

            <p className="register-link">
              <Link to="/login">Already have an account? Log In</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
