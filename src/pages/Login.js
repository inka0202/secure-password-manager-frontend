import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

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
    setLoginError("");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const isValidLength = value.length >= 8 && value.length <= 128;
    const notOnlySpaces = value.trim().length >= 8;
    setPasswordValid(isValidLength && notOnlySpaces);
    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("emailFor2FA", email);
        localStorage.setItem("awaiting2FA", true);
        navigate("/verify");
      } else {
        setLoginError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setLoginError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="screen">
      <HeaderN />
      <div className="content-area3">
        <img src={Photo4} alt="Photo4" className="photo4" />

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

            {/* Forgot password link - right aligned, under password input */}
            <div className="forgot-wrapper">
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            {/* Show login error below password input and forgot link */}
            {loginError && (
              <div className="messg error-message">{loginError}</div>
            )}

            <button
              type="submit"
              className="btnL"
              disabled={!emailValid || !passwordValid || !email || !password}
            >
              Log In!
            </button>

            <p className="register-link">
              <Link to="/register" id="a1">
                Don't have an account? Register
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
