import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import BloodInventoryTable from "../../components/BloodInventoryTable";
import RequestHistoryTable from "../../components/RequestHistoryTable";

const RecipientDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <DashboardLayout
      title="Recipient Dashboard"
      description="Request blood and track request status"
    >
      {/* Welcome Section */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h3>Welcome, {user?.username || "Recipient"}</h3>
        <p>
          This dashboard helps you check blood availability, submit requests,
          and track the status of your previous requests.
        </p>
      </div>

      {/* Blood Inventory */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h3>Available Blood Inventory</h3>
        <p>Review current stock before submitting a request.</p>
        <BloodInventoryTable userRole={user?.role} />
      </section>

      {/* Request History */}
      <section style={{ marginBottom: "2.5rem" }}>
        <RequestHistoryTable />
      </section>

      {/* Support Section */}
      <section>
        <h3>Volunteer Assistance</h3>
        <p>
          Volunteers may contact you via phone to assist with donor coordination
          and emergency logistics.
        </p>
      </section>
    </DashboardLayout>
  );
};

export default RecipientDashboard;
