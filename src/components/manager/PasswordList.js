import React from "react";
import PasswordItem from "./PasswordItem";
import "../../styles/PasswordList.css";

function PasswordList({ passwords, onEdit }) {
  if (passwords.length === 0)
    return <p className="empty-list">No saved passwords yet.</p>;

  return (
    <div className="password-list">
      {passwords.map((item) => (
        <PasswordItem key={item.id} item={item} onEdit={() => onEdit(item)} />
      ))}
    </div>
  );
}

export default PasswordList;
