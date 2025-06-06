import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderN from "../components/login/HeaderN";
import Footer from "../components/main/Footer";
import RPasswordInput from "../components/register/RPasswordInput";
import "../styles/2FACode.css"; // Make sure this matches your login/forgot-password style!

const ResetPassword = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying link...");
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordValid, setNewPasswordValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const t = urlParams.get("token");
    setToken(t);
    if (!t) {
      setMessage("Invalid or expired link.");
      return;
    }
    // Verify token with backend
    fetch(`${process.env.REACT_APP_API_URL}/api/auth/verify-reset-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: t }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setMessage("");
          setVerified(true);
        } else {
          setMessage(data.message || "Invalid or expired link.");
        }
      })
      .catch(() => {
        setMessage("Something went wrong. Try again.");
      });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }
    if (!newPasswordValid) {
      setMessage("Password requirements not met.");
      setIsSubmitting(false);
      return;
    }
    // Actually reset the password
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Password updated! You can now log in.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.message || "Reset failed.");
      }
    } catch {
      setMessage("Something went wrong. Try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="screen1">
      <HeaderN />
      <div className="content-area4">
        <div className="login-container1">
          <h2 id="Mh2">Reset Password</h2>
          <p id="notice">
            {verified
              ? "Enter your new password below."
              : message}
          </p>
          {verified && (
            <form className="login-form1" onSubmit={handleSubmit}>
              <RPasswordInput
                value={newPassword}
                onChange={e => {
                  setNewPassword(e.target.value);
                  // same validation logic as registration
                  const val = e.target.value;
                  const isValid =
                    val.length >= 8 &&
                    /[A-Z]/.test(val) &&
                    /\d/.test(val) &&
                    !/\s/.test(val);
                  setNewPasswordValid(isValid);
                  if (message) setMessage("");
                }}
                isValid={newPasswordValid}
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                minLength={8}
                required
                style={{marginBottom: "10px"}}
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="messg">Passwords do not match.</p>
              )}
              <button
                className="btnL1"
                type="submit"
                disabled={isSubmitting || !newPasswordValid}
              >
                {isSubmitting ? "Submitting..." : "Set Password"}
              </button>
              {message && <p className="messg">{message}</p>}
            </form>
          )}
          {!verified && message && <p className="messg">{message}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
