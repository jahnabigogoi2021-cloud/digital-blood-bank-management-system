import React, { useEffect, useState } from "react";

const RequestHistoryTable = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Dummy request history (academic project)
    setRequests([
      {
        id: 1,
        bloodGroup: "A+",
        units: 2,
        hospital: "City Hospital",
        date: "2025-01-02",
        status: "Pending",
      },
      {
        id: 2,
        bloodGroup: "O-",
        units: 1,
        hospital: "Apollo Clinic",
        date: "2025-01-01",
        status: "Approved",
      },
      {
        id: 3,
        bloodGroup: "AB-",
        units: 3,
        hospital: "Medical College",
        date: "2024-12-28",
        status: "Completed",
      },
    ]);
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h4>Blood Request History</h4>

      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Blood Group</th>
            <th>Units</th>
            <th>Hospital</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.bloodGroup}</td>
              <td>{req.units}</td>
              <td>{req.hospital}</td>
              <td>{req.date}</td>
              <td>{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestHistoryTable;
