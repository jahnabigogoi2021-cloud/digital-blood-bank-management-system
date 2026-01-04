import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import axios from "axios";

/* ===== IMPORT PAGES ===== */
import Home from "./pages/Home";
import Login from "./pages/Login";
import DonorRegister from "./pages/DonorRegister";
import RecipientRegister from "./pages/RecipientRegister";
import VolunteerRegister from "./pages/VolunteerRegister";

/* ===== DASHBOARD LAYOUT ===== */
const DashboardLayout = ({ title, description, children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "auto" }}>
      <h2>{title}</h2>
      <p style={{ color: "#555" }}>{description}</p>

      <p>
        <strong>User:</strong> {user?.username} ({user?.role})
      </p>

      {children}

      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

/* ===== BLOOD INVENTORY TABLE (REAL BACKEND DATA) ===== */
const BloodInventoryTable = ({ userRole }) => {
  const [inventory, setInventory] = useState([]);

  const editable = userRole === "admin" || userRole === "volunteer";

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const res = await axios.get("http://localhost:5000/api/inventory");
    setInventory(res.data);
  };

  const updateUnits = async (bloodGroup, units) => {
    await axios.post("http://localhost:5000/api/inventory/update", {
      bloodGroup,
      units: Number(units),
    });
    fetchInventory();
  };

  return (
    <table border="1" cellPadding="8" width="100%">
      <thead>
        <tr>
          <th>Blood Group</th>
          <th>Units</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item) => (
          <tr key={item._id}>
            <td>{item.bloodGroup}</td>
            <td>
              {editable ? (
                <input
                  type="number"
                  value={item.units}
                  onChange={(e) =>
                    updateUnits(item.bloodGroup, e.target.value)
                  }
                />
              ) : (
                item.units
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

/* ===== DASHBOARDS ===== */
const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <DashboardLayout
      title="Admin Dashboard"
      description="Manage blood inventory"
    >
      <BloodInventoryTable userRole={user.role} />
    </DashboardLayout>
  );
};

const DonorDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <DashboardLayout
      title="Donor Dashboard"
      description="View available blood inventory"
    >
      <BloodInventoryTable userRole={user.role} />
    </DashboardLayout>
  );
};

const RecipientDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <DashboardLayout
      title="Recipient Dashboard"
      description="Check blood availability"
    >
      <BloodInventoryTable userRole={user.role} />
    </DashboardLayout>
  );
};

const VolunteerDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <DashboardLayout
      title="Volunteer Dashboard"
      description="Update blood inventory"
    >
      <BloodInventoryTable userRole={user.role} />
    </DashboardLayout>
  );
};

/* ===== PROTECTED ROUTE (FIXED) ===== */
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) return <Navigate to="/login" />;
  if (role && role !== user.role) return <Navigate to="/login" />;

  return children;
};

/* ===== APP ===== */
export default function App() {
  return (
    <Router>
      <nav>
        <NavLink to="/">Home</NavLink> |{" "}
        <NavLink to="/login">Login</NavLink> |{" "}
        <NavLink to="/donor-register">Donor</NavLink> |{" "}
        <NavLink to="/recipient-register">Recipient</NavLink> |{" "}
        <NavLink to="/volunteer-register">Volunteer</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/donor-register" element={<DonorRegister />} />
        <Route path="/recipient-register" element={<RecipientRegister />} />
        <Route path="/volunteer-register" element={<VolunteerRegister />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor-dashboard"
          element={
            <ProtectedRoute role="donor">
              <DonorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipient-dashboard"
          element={
            <ProtectedRoute role="recipient">
              <RecipientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteer-dashboard"
          element={
            <ProtectedRoute role="volunteer">
              <VolunteerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
