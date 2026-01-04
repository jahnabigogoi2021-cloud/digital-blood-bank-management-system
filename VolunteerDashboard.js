import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import BloodInventoryTable from "../../components/BloodInventoryTable";

const VolunteerDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <DashboardLayout
      title="Volunteer Dashboard"
      description="Manage blood availability and assist in emergency coordination"
    >
      {/* Welcome Section */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h3>Welcome, {user?.username || "Volunteer"}</h3>
        <p>
          You help bridge the gap between donors and recipients during critical
          situations. Use this dashboard to monitor inventory and respond to
          urgent requests.
        </p>
      </div>

      {/* Blood Inventory */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h3>Blood Inventory (Editable)</h3>
        <p>You can update blood units as donations or distributions occur.</p>
        <BloodInventoryTable userRole={user?.role} />
      </section>

      {/* Emergency Requests Table */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h3>Active Emergency Requests</h3>
        <table width="100%" border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Recipient / Hospital</th>
              <th>Blood Group</th>
              <th>Urgency</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>XYZ Hospital</td>
              <td>O-</td>
              <td>High</td>
              <td>9876543210</td>
              <td>
                <button
                  style={{
                    padding: "0.3rem 0.7rem",
                    background: "#1976d2",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Assist
                </button>
              </td>
            </tr>
            <tr>
              <td>ABC Medical Center</td>
              <td>AB+</td>
              <td>Emergency</td>
              <td>9123456780</td>
              <td>
                <button
                  style={{
                    padding: "0.3rem 0.7rem",
                    background: "#1976d2",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Assist
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Volunteer Responsibilities */}
      <section>
        <h3>Your Responsibilities</h3>
        <ul>
          <li>Respond to emergency blood requests</li>
          <li>Coordinate donors and recipients</li>
          <li>Update inventory after donations</li>
          <li>Provide logistics and communication support</li>
        </ul>
      </section>
    </DashboardLayout>
  );
};

export default VolunteerDashboard;
