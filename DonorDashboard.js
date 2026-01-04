import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import BloodInventoryTable from "../../components/BloodInventoryTable";
import DonationHistoryTable from "../../components/DonationHistoryTable";

const DonorDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <DashboardLayout
      title="Donor Dashboard"
      description="Manage your donations and help save lives"
    >
      {/* Welcome Section */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h3>Welcome, {user?.username || "Donor"}</h3>
        <p>
          Thank you for being a blood donor. Your contribution plays a crucial
          role in saving lives. You can view inventory status and track your
          donation history below.
        </p>
      </div>

      {/* Blood Inventory */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h3>Blood Availability</h3>
        <p>Live overview of blood units available in the system.</p>
        <BloodInventoryTable userRole={user?.role} />
      </section>

      {/* Donation History */}
      <section style={{ marginBottom: "2.5rem" }}>
        <DonationHistoryTable />
      </section>

      {/* Donor Actions */}
      <section>
        <h3>Donor Actions</h3>
        <ul>
          <li>Check eligibility for next donation</li>
          <li>Update last donation date</li>
          <li>Receive emergency blood request alerts</li>
        </ul>
      </section>
    </DashboardLayout>
  );
};

export default DonorDashboard;
