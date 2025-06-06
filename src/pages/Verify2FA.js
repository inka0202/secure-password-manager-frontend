import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/2FACode.css";
import HeaderN from "../components/login/HeaderN";
import Footer from "../components/main/Footer";
import { useEffect } from 'react';

const Verify2FA = () => {
  const email = localStorage.getItem("emailFor2FA"); 
  const [code, setCode] = useState(""); 
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAllowed = localStorage.getItem("awaiting2FA");
    if (!isAllowed) {
      navigate("/login");
    }
  }, [navigate]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/verify-2fa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.removeItem("emailFor2FA");
      localStorage.removeItem("awaiting2FA");
      setMessage("Success! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } else {
      setMessage(data.message || "Invalid code!");
    }
  } catch (err) {
    console.error(err);
    setMessage("Something went wrong!");
  }
};

  return (
    <div className="screen1">
      <HeaderN />
      <div className="content-area4">
        <div className="login-container1">
          <h2 id="Mh2">We've sent a code to your email</h2>
          <p id="notice">If you can't find it - check your spam folder</p>
          <form onSubmit={handleSubmit} className="login-form1">
            <input
              type="text"
              placeholder="6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              maxLength="6"
            />

            <button className="btnL1" type="submit">
              Verify!
            </button>

            {message && <p className="messg1">{message}</p>}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Verify2FA;
