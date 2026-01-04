import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import BloodInventoryTable from "../../components/BloodInventoryTable";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <DashboardLayout
      title="Admin Dashboard"
      description="System-wide control of users, inventory, and reports"
    >
      {/* Admin Intro */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h3>Welcome, {user?.username || "Admin"}</h3>
        <p>
          You have full administrative access to the Blood Bank Management
          System. Monitor users, manage inventory, and review system activity.
        </p>
      </div>

      {/* Inventory Management */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h3>Blood Inventory Management</h3>
        <p>View and update blood availability across all blood groups.</p>
        <BloodInventoryTable userRole={user?.role} />
      </section>

      {/* User Management */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h3>User Management</h3>
        <table width="100%" border="1" cellPadding="8">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rahul Sharma</td>
              <td>Donor</td>
              <td>rahul@email.com</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>Anita Das</td>
              <td>Recipient</td>
              <td>anita@email.com</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>Vikas Kumar</td>
              <td>Volunteer</td>
              <td>vikas@email.com</td>
              <td>Pending</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Reports & Logs */}
      <section>
        <h3>System Reports</h3>
        <ul>
          <li>Donation history report</li>
          <li>Blood request and approval logs</li>
          <li>Inventory update history</li>
          <li>User registration activity</li>
        </ul>
      </section>
    </DashboardLayout>
  );
};

export default AdminDashboard;
