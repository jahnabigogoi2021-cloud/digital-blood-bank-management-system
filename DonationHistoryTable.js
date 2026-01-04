import React, { useEffect, useState } from "react";

const DonationHistoryTable = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Dummy donation history (academic project)
    setDonations([
      {
        id: 1,
        bloodGroup: "A+",
        units: 1,
        date: "2024-12-20",
        location: "City Blood Bank",
        status: "Completed",
      },
      {
        id: 2,
        bloodGroup: "O+",
        units: 1,
        date: "2024-09-15",
        location: "Red Cross Center",
        status: "Completed",
      },
      {
        id: 3,
        bloodGroup: "B-",
        units: 1,
        date: "2024-06-10",
        location: "District Hospital",
        status: "Completed",
      },
    ]);
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h4>Donation History</h4>

      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Blood Group</th>
            <th>Units</th>
            <th>Donation Date</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {donations.map((donation) => (
            <tr key={donation.id}>
              <td>{donation.bloodGroup}</td>
              <td>{donation.units}</td>
              <td>{donation.date}</td>
              <td>{donation.location}</td>
              <td>{donation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationHistoryTable;
