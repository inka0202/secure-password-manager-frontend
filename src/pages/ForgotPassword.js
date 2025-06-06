import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/2FACode.css";
import HeaderN from "../components/login/HeaderN";
import Footer from "../components/main/Footer";
import EmailInput from "../components/login/ForgotInput"; 

const getRecentEmails = () => {
  // Get from localStorage (e.g. key = "recentEmails"), or return empty array
  const stored = localStorage.getItem("recentEmails");
  return stored ? JSON.parse(stored) : [];
};

const saveRecentEmail = (email) => {
  if (!email) return;
  let emails = getRecentEmails();
  // Remove duplicates and keep only the 5 most recent
  emails = [email, ...emails.filter(e => e !== email)].slice(0, 5);
  localStorage.setItem("recentEmails", JSON.stringify(emails));
};

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
  return re.test(email);
};

const isEmailLengthValid = (email) => email.length >= 6 && email.length <= 254;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [recentEmails, setRecentEmails] = useState(getRecentEmails());
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
    setRecentEmails(getRecentEmails());
    document.getElementById("emailInput")?.focus();
  }, [navigate]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(validateEmail(value) && isEmailLengthValid(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        setMessage("If this email is registered, a reset link has been sent!");
        setSent(true);
        saveRecentEmail(email);
        setRecentEmails(getRecentEmails());
      } else {
        const data = await res.json();
        setMessage(data.message || "Error sending reset link.");
      }
    } catch (err) {
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="screen1">
      <HeaderN />
      <div className="content-area4">
        <div className="login-container1">
          <h2 id="Mh2">Forgot Password?</h2>
          <p id="notice">Enter your email address below and we’ll send a login link.</p>
          <form onSubmit={handleSubmit} className="login-form1">
            <EmailInput
              value={email}
              onChange={handleEmailChange}
              isValid={emailValid}
              recentEmails={recentEmails}
            />
            <button className="btnL1" type="submit" disabled={sent || !emailValid || !email}>
              {sent ? "Sent!" : "Send Link"}
            </button>
            {message && <p className="messg1">{message}</p>}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
