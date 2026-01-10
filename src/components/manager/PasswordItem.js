import React, { useState } from "react";
import "../../styles/PasswordItem.css";

function PasswordItem({ item, onEdit, onDelete }) {
  const [showPassword, setShowPassword] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="password-item">
      <div className="info">
        <div className="email" title={item.email}>
          {item.email}
        </div>
        <div className="url" title={item.url}>
          {item.url}
        </div>
      </div>
      <div className="password-field">
        {showPassword ? item.password : "•".repeat(10)}
      </div>
      <button
        className="toggle-password-btn"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? "👁" : "👁"}
      </button>
      <div className="actions">
        <button
          onClick={() => copyToClipboard(item.email)}
          title="Copy Email"
          className="bnt1 copy-btn"
        >
          📋
        </button>
        <button
          onClick={() => copyToClipboard(item.password)}
          title="Copy Password"
          className="bnt1 copy-btn"
        >
          📋
        </button>
        <button
          className="bnt1 menu-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="More options"
        >
          ⋮
        </button>

        {menuOpen && (
          <div className="menu-dropdown">
            <button
              className="md"
              onClick={() => {
                copyToClipboard(item.email);
                setMenuOpen(false);
              }}
            >
              Copy Email
            </button>
            <button
              className="md"
              onClick={() => {
                copyToClipboard(item.password);
                setMenuOpen(false);
              }}
            >
              Copy Password
            </button>
            <button
              className="md"
              onClick={() => {
                onEdit();
                setMenuOpen(false);
              }}
            >
              Edit
            </button>
            <button
              className="md"
              onClick={() => {
                onDelete(item.id);
                setMenuOpen(false);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PasswordItem;
