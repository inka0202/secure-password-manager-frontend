import React, { useState, useEffect } from "react";
import UserItem from "../admin/UserItem";
import ConfirmActionModal from "../admin/ConfirmActionModal";
import "../../styles/UserList.css";
function UsersList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(null); // 'suspend' | 'delete'
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // TODO: Replace with real API call
    const fakeUsers = [
      { id: 1, email: "user1@mail.com", isSuspended: false },
      { id: 2, email: "user2@mail.com", isSuspended: true },
      { id: 3, email: "user3@mail.com", isSuspended: false }
    ];
    setUsers(fakeUsers);
  }, []);

  const handleAction = (user, type) => {
    setSelectedUser(user);
    setActionType(type);
    setIsModalOpen(true);
  };

  const confirmAction = () => {
    if (!selectedUser) return;

    setUsers((prev) =>
      prev
        .map((u) =>
          u.id === selectedUser.id
            ? actionType === "suspend"
              ? { ...u, isSuspended: !u.isSuspended }
              : null // for delete, remove in next step
            : u
        )
        .filter(Boolean)
    );

    // TODO: log admin action to backend (audit log)

    setIsModalOpen(false);
    setSelectedUser(null);
    setActionType(null);
  };

  return (
    <div>
      <h2 id="h2L">Manage Users</h2>
      <div className="users-list-container">
        {users.map((user) => (
          <UserItem key={user.id} user={user} onAction={handleAction} />
        ))}
      </div>

      {isModalOpen && (
        <ConfirmActionModal
          user={selectedUser}
          actionType={actionType}
          onConfirm={confirmAction}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default UsersList;
