import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import HeaderAd from "../components/admin/HeaderAd";
import "../styles/AdminLogs.css";

function AdminLogs() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        navigate("/");
        return;
      }
      fetchLogs(token);
    } catch {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const fetchLogs = async (token) => {
    setLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/logs`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      setLogs(data);
    }
    setLoading(false);
  };

  return (
    <div className="dashboard-container" style={{ marginLeft: "240px", padding: "40px" }}>
      <HeaderAd />
      <div className="dashboard-content">
        <h2>Admin Action Logs</h2>
        {loading ? (
          <div>Loading...</div>
        ) : logs.length === 0 ? (
          <div>No admin actions logged yet.</div>
        ) : (
          <table className="logs-table" style={{ width: "100%", marginTop: "24px", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Admin</th>
                <th>Action</th>
                <th>Target</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id}>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>{log.adminEmail}</td>
                  <td>{log.action.replace(/_/g, " ")}</td>
                  <td>{log.targetEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminLogs;
