import React, { useState, useEffect } from "react";
import "../../styles/AddPasswordModal.css";
import { generateStrongPassword } from "./passwordGenerator"; 
import zxcvbn from "zxcvbn";

function AddPasswordModal({ onClose, onSave, passwordToEdit }) {
  const [site, setSite] = useState(passwordToEdit ? passwordToEdit.site : "");
  const [label, setLabel] = useState(passwordToEdit ? passwordToEdit.label : "");
  const [password, setPassword] = useState(passwordToEdit ? passwordToEdit.password : "");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSite(passwordToEdit ? passwordToEdit.site : "");
    setLabel(passwordToEdit ? passwordToEdit.label : "");
    setPassword(passwordToEdit ? passwordToEdit.password : "");
    setPasswordStrength(passwordToEdit ? enhancedPasswordCheck(passwordToEdit.password) : null);
    setError("");
    setIsSaving(false);
  }, [passwordToEdit]);

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

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError("Failed to copy password.");
    }
  };

  const enhancedPasswordCheck = (password) => {
    const zxcvbnResult = zxcvbn(password);
    let score = zxcvbnResult.score;

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
      score = Math.min(score, 2);
    }
    return { ...zxcvbnResult, score };
  };

  const handleSave = (e) => {
    e.preventDefault();
    setError("");
    if (!site || !label || !password) {
      setError("Please fill in all fields");
      return;
    }
    setIsSaving(true);
    // Only pass data to parent, don't do API calls here
    onSave({ label, site, password });
    setIsSaving(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{passwordToEdit ? "Edit Password" : "Add Password"}</h2>
        <form onSubmit={handleSave} className="add-password-form">
          <label>
            URL
            <input
              type="text"
              value={site}
              onChange={e => setSite(e.target.value)}
              placeholder="Enter website URL"
              required
            />
          </label>
          <label>
            Custom name or email:
            <input
              type="text"
              value={label}
              onChange={e => setLabel(e.target.value)}
              placeholder="Enter custom name or email"
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
                tabIndex={-1}
              >
                {showPassword ? "👁" : "👁"}
              </button>
              <button
                type="button"
                className="copy-btn"
                onClick={handleCopyPassword}
                style={{ marginLeft: 8 }}
              >
                📋
              </button>
            </div>
            {/* Copied message */}
            {copied && (
              <div className="copied-message" style={{ color: "green", marginTop: 4 }}>
                Copied to clipboard!
              </div>
            )}
          </label>

          {password && passwordStrength && (
            <div className="strength-meter">
              <div className={`strength-bar strength-${passwordStrength.score}`}></div>
              <p className="strength-text">
                {["Very Weak", "Weak", "Fair", "Good", "Strong"][passwordStrength.score]}
              </p>
            </div>
          )}

          <button type="button" className="gbtn" onClick={handleGeneratePassword} disabled={isSaving}>
            Generate
          </button>

          {error && <div className="messg error-message">{error}</div>}

          <div className="modal-buttons">
            <button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPasswordModal;
