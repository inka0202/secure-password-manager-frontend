import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderN from "../components/login/HeaderN";
import Footer from "../components/main/Footer";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying link...");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (!token) {
      setMessage("Invalid or expired link.");
      return;
    }
    // Verify token with backend
    fetch("http://localhost:5000/api/auth/verify-reset-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok && data.token) {
          // Save JWT and redirect
          localStorage.setItem("token", data.token);
          setMessage("Login successful! Redirecting...");
          setTimeout(() => {
            navigate("/"); // Change this if you want a different page
          }, 1200);
        } else {
          setMessage(data.message || "Invalid or expired link.");
        }
      })
      .catch(() => {
        setMessage("Something went wrong. Try again.");
      });
  }, [navigate]);

  return (
    <div className="screen">
      <HeaderN />
      <div className="content-area3">
        <div className="login-container">
          <h2>Reset Password Link</h2>
          <p>{message}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
