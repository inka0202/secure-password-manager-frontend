import React, { useState, useEffect } from "react";
import HeaderM from "../components/manager/HeaderM";
import zxcvbn from "zxcvbn";

import "../styles/AddPasswordModal.css";
import "../styles/ManagerA.css";
import { generateStrongPassword } from "../components/manager/passwordGenerator";

const ManagerA = ({ userEmail, onSave, editData }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [passwordStrength, setPasswordStrength] = useState(null);

  useEffect(() => {
    if (editData) {
      setNewPassword(editData.Newpassword);
      setPasswordStrength(enhancedPasswordCheck(editData.password));
    }
  }, [editData]);

  const handlePasswordChange = (e) => {
    const Pass = e.target.value;
    setNewPassword(Pass);
    setPasswordStrength(enhancedPasswordCheck(Pass));
  };

  const handleGeneratePassword = () => {
    const strongPass = generateStrongPassword();
    setNewPassword(strongPass);
    setPasswordStrength(enhancedPasswordCheck(strongPass));
  };

  const handleSave = () => {
    if (currentPassword || newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        alert("New passwords do not match");
        return;
      }
      if (newPassword === currentPassword) {
        alert("New password must be different from current password");
      }

      // Тут буде логіка оновлення пароля (запит на бек) + перевірка чи пароль юзера відповідає currentPassword
      alert("Password changed successfully");
      return;
    }
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    onSave({
      currentPassword,
      newPassword,
      confirmPassword
    });
  };

  const enhancedPasswordCheck = (password) => {
    const zxcvbnResult = zxcvbn(password);
    let score = zxcvbnResult.score; // 0..4

    if (/\s/.test(password)) {
      score = Math.max(0, score - 1);
    }

    if (/([a-zA-Z0-9])\1{3,}/.test(password)) {
      score = Math.max(0, score - 1);
    }

    if (password.length < 13) {
      score = 0;
    }

    let typesCount = 0;
    if (/[a-z]/.test(password)) typesCount++;
    if (/[A-Z]/.test(password)) typesCount++;
    if (/\d/.test(password)) typesCount++;
    const specialChars = /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/]/;

    if (specialChars.test(password)) typesCount++;

    if (typesCount < 3) {
      score = Math.min(score, 2); //Maximum "Fair" if less than 3 types
    }

    return { ...zxcvbnResult, score };
  };

  const getUserInitials = (email) => {
    //тут з бека треба email
    if (!email) return "??";
    const parts = email.split("@")[0];
    return parts
      .split(".")
      .map((word) => word[0]?.toUpperCase())
      .join("")
      .slice(0, 2);
  };

  return (
    <div
      className="account-page"
      style={{ marginLeft: "240px", padding: "40px" }}
    >
      <HeaderM />
      <h1>Account Settings</h1>
      {/* USER INFO */}
      <div className="user-info-card">
        <div className="avatar-circle">
          <span>{getUserInitials(userEmail)}</span>
        </div>
        <div className="user-email">
          <h2 className="as">Account Info</h2>
          <p>{userEmail}</p>
        </div>
      </div>

      {/* PASSWORD CHANGE FORM */}
      <div className="change-password-card ">
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
                name="currentPassword"
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                placeholder="Enter Current Password"
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
          </label>

          <label htmlFor="newPassword">
            New Password:
            <div className="password-input-wrapper">
              <input
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter New Password"
                required
              />
            </div>
            {newPassword && passwordStrength && (
              <div className="strength-meter">
                <div
                  className={`strength-bar strength-${passwordStrength.score}`}
                ></div>
                <p className="strength-text">
                  {
                    ["Very Weak", "Weak", "Fair", "Good", "Strong"][
                      passwordStrength.score
                    ]
                  }
                </p>
              </div>
            )}
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
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confiirm New Password"
                required
              />
            </div>
          </label>

          <button type="submit" className="upd" onClick={handleSave}>
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManagerA;
