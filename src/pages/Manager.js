import React, { useState } from "react";
import HeaderM from "../components/manager/HeaderM";
import AddPasswordModal from "../components/manager/AddPasswordModal";
import "../styles/Manager.css";

import PasswordList from "../components/manager/PasswordList";

const Manager = () => {
  const [passwords, setPasswords] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const openModal = (item = null) => {
    setEditItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditItem(null);
  };
  const savePassword = (newEntry) => {
    if (editItem) {
      // оновити існуючий пароль
      setPasswords((prev) =>
        prev.map((item) => (item.id === editItem.id ? newEntry : item))
      );
    } else {
      // додати новий пароль
      setPasswords((prev) => [...prev, { ...newEntry, id: Date.now() }]);
    }
    closeModal();
  };
  const deletePassword = (id) => {
    setPasswords((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div
      className="passwords-page"
      style={{ marginLeft: "240px", padding: "40px" }}
    >
      <HeaderM />
      <h1>My Passwords</h1>

      <div className="panelM">
        <button className="add-btn" onClick={() => openModal()}>
          + Add Password
        </button>
      </div>

      <PasswordList
        passwords={passwords}
        onEdit={openModal}
        onDelete={deletePassword}
      />
      {modalOpen && (
        <AddPasswordModal
          onClose={closeModal}
          onSave={savePassword}
          editData={editItem}
        />
      )}
    </div>
  );
};
export default Manager;
