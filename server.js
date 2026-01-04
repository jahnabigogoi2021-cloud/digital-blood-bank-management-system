require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

const BloodInventory = require("./models/BloodInventory");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/inventory", inventoryRoutes);

// ✅ AUTO SEED ALL 8 BLOOD GROUPS
const seedBloodInventory = async () => {
  const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-"
  ];

  for (const group of bloodGroups) {
    const exists = await BloodInventory.findOne({ bloodGroup: group });
    if (!exists) {
      await BloodInventory.create({
        bloodGroup: group,
        units: 0
      });
    }
  }

  console.log("Blood inventory initialized (8 groups) - server.js:45");
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected - server.js:51");
    await seedBloodInventory(); // 🔥 KEY LINE
  })
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});
