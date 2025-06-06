import React, { useState, useEffect } from "react";
import HeaderM from "../components/manager/HeaderM";
import AddPasswordModal from "../components/manager/AddPasswordModal";
import "../styles/Manager.css";
import { useNavigate } from "react-router-dom";
import PasswordList from "../components/manager/PasswordList";

const Manager = () => {
  const [passwords, setPasswords] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const navigate = useNavigate();

  const loadPasswords = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/passwords`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }
    const data = await res.json();
    setPasswords(
      (data || []).map(item => ({
        id: item.id || item._id,
        label: item.label,
        site: item.site,
        password: item.password
      }))
    );
  };

  useEffect(() => {
    loadPasswords();
    // eslint-disable-next-line
  }, []);

  const openModal = (item = null) => {
    setEditItem(item);
    setModalOpen(true);
  };

  // SAVE: make sure to await API, THEN close, THEN load
 const savePassword = async (entry) => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }
  if (editItem && editItem.id) {
    // EDIT existing password
    await fetch(
      `${process.env.REACT_APP_API_URL}/api/passwords/${editItem.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(entry)
      }
    );
  } else {
    // ADD new password
    await fetch(`${process.env.REACT_APP_API_URL}/api/passwords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(entry)
    });
  }
  setModalOpen(false);
  setEditItem(null);
  await loadPasswords();
};

  const deletePassword = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    await fetch(`${process.env.REACT_APP_API_URL}/api/passwords/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    await loadPasswords();
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditItem(null);
  };

  return (
    <div className="passwords-page" style={{ marginLeft: "240px", padding: "40px" }}>
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
          passwordToEdit={editItem}
        />
      )}
    </div>
  );
};

export default Manager;
