import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardLayout = ({ title, description, children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "auto" }}>
      <h2>{title}</h2>
      <p style={{ color: "#555" }}>{description}</p>

      <div style={{ marginTop: "0.8rem", fontSize: "0.95rem" }}>
        <strong>User:</strong> {user?.username} ({user?.role})
      </div>

      <div
        style={{
          marginTop: "1.5rem",
          padding: "1.5rem",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        {children}
      </div>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "2rem",
          background: "#d32f2f",
          color: "#fff",
          border: "none",
          padding: "0.6rem 1.5rem",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardLayout;
