import React, { useState, useEffect } from "react";
import HeaderM from "../components/manager/HeaderM";
import RPasswordInput from "../components/register/RPasswordInput";
import "../styles/AddPasswordModal.css";
import "../styles/ManagerA.css";
import { generateStrongPassword } from "../components/manager/passwordGenerator";
import { useNavigate } from "react-router-dom";

const ManagerA = () => {
  const [userEmail, setUserEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newPasswordValid, setNewPasswordValid] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    // Not logged in, redirect!
    navigate("/login");
    return;
  }
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUserEmail(payload.email);
  } catch (err) {
    console.error("Invalid token", err);
    // Optionally, handle invalid token (e.g., clear and redirect)
    localStorage.removeItem("token");
    navigate("/my-account");
  }
}, [navigate]);

  const handleGeneratePassword = () => {
    const strongPass = generateStrongPassword();
    setNewPassword(strongPass);
  };

  const handleSave = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (newPassword === currentPassword) {
      alert("New password must be different from current password");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password changed successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(data.message || "Password update failed.");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      alert("Something went wrong.");
    }
  };

  const getUserInitials = (email) => {
    if (!email) return "??";
    const parts = email.split("@")[0];
    return parts
      .split(".")
      .map((word) => word[0]?.toUpperCase())
      .join("")
      .slice(0, 2);
  };

  return (
    <div className="account-page" style={{ marginLeft: "240px", padding: "40px" }}>
      <HeaderM />
      <h1>Account Settings</h1>

      <div className="user-info-card">
        <div className="avatar-circle">
          <span>{getUserInitials(userEmail)}</span>
        </div>
        <div className="user-email">
          <h2 className="as">{userEmail}</h2>
        </div>
      </div>

      <div className="change-password-card">
        <div className="sb">
          <h2 className="cp">Change Password</h2>
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁" : "👁"}
          </button>
        </div>

        <form>
          <label htmlFor="currentPassword">
            Current Password:
            <div className="password-input-wrapper">
              <input
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter Current Password"
                required
              />
            </div>
          </label>

          <label htmlFor="newPassword">
            New Password:
            <RPasswordInput
              value={newPassword}
              onChange={(e) => {
                const val = e.target.value;
                setNewPassword(val);
                const isValid = [
                  val.length >= 8,
                  /[A-Z]/.test(val),
                  /\d/.test(val),
                  /^[A-Za-z0-9]*$/.test(val),
                ].every(Boolean);
                setNewPasswordValid(isValid);
              }}
              isValid={newPasswordValid}
              type={showPassword ? "text" : "password"}
            />
             <button
              type="button"
              className="gbtn"
              onClick={handleGeneratePassword}
            >
              Generate
            </button>
          </label>

          <label htmlFor="confirmPassword">
            Confirm New Password:
            <div className="password-input-wrapper">
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                required
              />
            </div>
          </label>

          {confirmPassword && newPassword !== confirmPassword && (
            <p className="error-message">Passwords do not match.</p>
          )}

          <button
            type="submit"
            className="upd"
            onClick={handleSave}
            disabled={
              !newPasswordValid ||
              !newPassword ||
              !confirmPassword ||
              !currentPassword ||
              newPassword !== confirmPassword
            }
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManagerA;
