import React, { useEffect, useState } from "react";
import axios from "axios";

const ALL_BLOOD_GROUPS = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
];

const BloodInventoryTable = ({ userRole }) => {
  const [inventory, setInventory] = useState([]);
  const isEditable = userRole === "admin" || userRole === "volunteer";

  useEffect(() => {
    axios
      .get("/api/inventory")
      .then((res) => {
        const backendData = res.data;

        // Merge backend data with all blood groups
        const normalizedInventory = ALL_BLOOD_GROUPS.map((group) => {
          const match = backendData.find((item) => item.group === group);
          return (
            match || {
              _id: null,
              group,
              units: 0,
            }
          );
        });

        setInventory(normalizedInventory);
      })
      .catch((err) =>
        console.log("Error fetching inventory - BloodInventoryTable.js:33", err)
      );
  }, []);

  const handleChange = (index, value) => {
    const updated = [...inventory];
    updated[index].units = Number(value);
    setInventory(updated);
  };

  const handleSave = () => {
    const requests = inventory
      .filter((item) => item._id) // save only existing backend records
      .map((item) =>
        axios.put(`/api/inventory/${item._id}`, { units: item.units })
      );

    Promise.all(requests)
      .then(() => alert("Inventory updated successfully"))
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h3>Blood Inventory Status</h3>

      <table
        width="100%"
        border="1"
        cellPadding="8"
        style={{ marginTop: "1rem", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Blood Group</th>
            <th>Units Available</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map((item, i) => (
            <tr key={i}>
              <td><strong>{item.group}</strong></td>
              <td>
                {isEditable ? (
                  <input
                    type="number"
                    min="0"
                    value={item.units}
                    onChange={(e) => handleChange(i, e.target.value)}
                    style={{ width: "70px" }}
                  />
                ) : (
                  item.units
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditable && (
        <button
          onClick={handleSave}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1.2rem",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save Inventory
        </button>
      )}
    </div>
  );
};

export default BloodInventoryTable;
