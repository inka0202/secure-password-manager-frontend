import React, { useState, useEffect } from "react";
import "../../styles/AddPasswordModal.css";
import { generateStrongPassword } from "../manager/passwordGenerator";
import zxcvbn from "zxcvbn";

function AddPasswordModal({ onClose, onSave, editData }) {
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);

  useEffect(() => {
    if (editData) {
      setEmail(editData.email);
      setUrl(editData.url);
      setPassword(editData.password);
      setPasswordStrength(enhancedPasswordCheck(editData.password));
    }
  }, [editData]);

  const handleGeneratePassword = () => {
    const strongPass = generateStrongPassword();
    setPassword(strongPass);
    setPasswordStrength(enhancedPasswordCheck(strongPass));
  };

  const handlePasswordChange = (e) => {
    const newPass = e.target.value;
    setPassword(newPass);
    setPasswordStrength(enhancedPasswordCheck(newPass));
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

  const handleSave = () => {
    if (!email || !url || !password) {
      alert("Please fill in all fields");
      return;
    }
    onSave({ id: editData?.id || Date.now(), email, url, password });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{editData ? "Edit Password" : "Add Password"}</h2>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </label>

        <label>
          URL:
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL"
            required
          />
        </label>

        <label>
          Password:
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁" : "👁"}
            </button>
          </div>
        </label>

        {password && passwordStrength && (
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

        <button type="button" className="gbtn" onClick={handleGeneratePassword}>
          Generate
        </button>

        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPasswordModal;
