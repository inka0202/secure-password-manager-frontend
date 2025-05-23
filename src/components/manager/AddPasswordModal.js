import React, { useState, useEffect } from "react";
import "../../styles/AddPasswordModal.css";

function AddPasswordModal({ onClose, onSave, editData }) {
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (editData) {
      setEmail(editData.email);
      setUrl(editData.url);
      setPassword(editData.password);
    }
  }, [editData]);

  /*const handleGeneratePassword = () => {
    const strongPass = generateStrongPassword();
    setPassword(strongPass);
  };*/
  /*import { generateStrongPassword } from "../manager/passwordGenerator";*/
  /*  <button
              type="button"
              className="generate-btn"
              onClick={handleGeneratePassword}
            >
              Generate
            </button>*/

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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />

            <button
              type="button"
              className="toggle-visibility-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁" : "👁"}
            </button>
          </div>
        </label>
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
