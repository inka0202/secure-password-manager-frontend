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

  // Load passwords on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/passwords", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return [];
        }
        return res.json();
      })
      .then(data => {
        // Ensure label and site are mapped!
        setPasswords(
          (data || []).map(item => ({
            id: item._id,
            label: item.label,
            site: item.site,
            password: item.password
          }))
        );
      })
      .catch(() => {
        // Could add an error state here!
      });
  }, [navigate]);

  // Open modal to add or edit
  const openModal = (item = null) => {
    setEditItem(item);
    setModalOpen(true);
  };

  // Save a new or edited password (calls backend)
  const savePassword = async (entry) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (editItem && editItem.id) {
      // EDIT existing password
      const res = await fetch(`http://localhost:5000/api/passwords/${editItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          label: entry.label,
          site: entry.site,
          password: entry.password
        })
      });
      if (res.ok) {
        setPasswords(prev =>
          prev.map(item =>
            item.id === editItem.id
              ? { ...entry, id: editItem.id }
              : item
          )
        );
      }
    } else {
      // ADD new password
      const res = await fetch("http://localhost:5000/api/passwords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          label: entry.label,
          site: entry.site,
          password: entry.password
        })
      });
      if (res.ok) {
        // Refetch the updated password list (ensures you get the right fields!)
        const newList = await fetch("http://localhost:5000/api/passwords", {
          headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.json());
        setPasswords(
          (newList || []).map(item => ({
            id: item._id,
            label: item.label,
            site: item.site,
            password: item.password
          }))
        );
      }
    }
    setModalOpen(false);
    setEditItem(null);
  };

  // Delete password
  const deletePassword = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    await fetch(`http://localhost:5000/api/passwords/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    setPasswords(prev => prev.filter(item => item.id !== id));
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
          editData={editItem}
        />
      )}
    </div>
  );
};

export default Manager;
