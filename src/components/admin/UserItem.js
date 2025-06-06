import "../../styles/UserItem.css";

function UserItem({ user, onAction, currentUserId }) {
  const isSelf = user._id === currentUserId;

  return (
    <div className="user-item">
      <div className="user-info">
        <span className="avatar">{user.email.slice(0, 2).toUpperCase()}</span>
        <span className="email">{user.email}</span>
        <span className={`status ${user.isSuspended ? "suspended" : "active"}`}>
          {user.isSuspended ? "Suspended" : "Active"}
        </span>
        {user.role === "admin" && (
          <span className="role-label" style={{ marginLeft: "8px", color: "#002b5c", fontWeight: 600 }}>
            Admin
          </span>
        )}
      </div>
      <div className="actions">
        <button
          className="bA"
          onClick={() => onAction(user, "suspend")}
          disabled={isSelf}
          title={isSelf ? "You can't suspend yourself!" : ""}
        >
          {user.isSuspended ? "Unsuspend" : "Suspend"}
        </button>
        <button
          className="bA"
          onClick={() => onAction(user, "delete")}
          disabled={isSelf}
          title={isSelf ? "You can't delete yourself!" : ""}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default UserItem;
