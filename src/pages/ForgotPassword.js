import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/2FACode.css";
import HeaderN from "../components/login/HeaderN";
import Footer from "../components/main/Footer";
import { useEffect } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        setMessage("If this email is registered, a reset link has been sent!");
        setSent(true);
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
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <button className="btnL1" type="submit" disabled={sent}>
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
