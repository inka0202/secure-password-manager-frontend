import React, { useState, useEffect } from "react";
import UserItem from "../admin/UserItem";
import ConfirmActionModal from "../admin/ConfirmActionModal";
import "../../styles/UserList.css";

function UsersList({ currentUserId }) {   // <-- Add this prop!
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAction = (user, type) => {
    setSelectedUser(user);
    setActionType(type);
    setIsModalOpen(true);
  };

  const confirmAction = async () => {
    if (!selectedUser) return;
    const token = localStorage.getItem("token");
    if (actionType === "delete") {
      await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/users/${selectedUser._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    } else if (actionType === "suspend") {
      await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/users/${selectedUser._id}/${selectedUser.isSuspended ? "unsuspend" : "suspend"}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    }
    setIsModalOpen(false);
    setSelectedUser(null);
    setActionType(null);
    fetchUsers();
  };

  return (
    <div>
      <h2 id="h2L">Manage Users</h2>
      {loading && <div>Loading...</div>}
      <div className="users-list-container">
        {users.map((user) => (
          <UserItem
            key={user._id}
            user={user}
            onAction={handleAction}
            currentUserId={currentUserId}   // <-- Pass currentUserId to UserItem
          />
        ))}
      </div>
      {isModalOpen && (
        <ConfirmActionModal
          user={selectedUser}
          actionType={actionType === "suspend"
            ? (selectedUser.isSuspended ? "unsuspend" : "suspend")
            : actionType}
          onConfirm={confirmAction}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default UsersList;
