import React from "react";
import "../../styles/ConfirmActionModal.css";

function ConfirmActionModal({ user, actionType, onConfirm, onCancel }) {
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h3 id="title">Are you sure?</h3>
        <p id="text">
          You are about to <strong>{actionType}</strong> user:{" "}
          <strong>{user.email}</strong>
        </p>
        <div className="modalButtons">
          <button className="btn1A" onClick={onConfirm}>
            Yes, Confirm
          </button>
          <button onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmActionModal;