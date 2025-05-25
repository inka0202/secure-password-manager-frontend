import "../../styles/UserItem.css";

function UserItem({ user, onAction }) {
  return (
    <div className="user-item">
      <div className="user-info">
        <span className="avatar">{user.email.slice(0, 2).toUpperCase()}</span>
        <span className="email">{user.email}</span>
        <span className={`status ${user.isSuspended ? "suspended" : "active"}`}>
          {user.isSuspended ? "Suspended" : "Active"}
        </span>
      </div>
      <div className="actions">
        <button className="bA" onClick={() => onAction(user, "suspend")}>
          {user.isSuspended ? "Unsuspend" : "Suspend"}
        </button>
        <button className="bA" onClick={() => onAction(user, "delete")}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default UserItem;
