const express = require("express");
const BloodInventory = require("../models/BloodInventory");

const router = express.Router();

/* ===== DEFAULT BLOOD GROUPS ===== */
const DEFAULT_BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-"
];

/* ===== GET ALL INVENTORY (AUTO-SEED) ===== */
router.get("/", async (req, res) => {
  try {
    // Check existing inventory
    const existingInventory = await BloodInventory.find();

    // If inventory is empty OR incomplete, seed missing groups
    if (existingInventory.length < DEFAULT_BLOOD_GROUPS.length) {
      for (const group of DEFAULT_BLOOD_GROUPS) {
        const exists = await BloodInventory.findOne({ bloodGroup: group });
        if (!exists) {
          await BloodInventory.create({ bloodGroup: group, units: 0 });
        }
      }
    }

    // Fetch updated inventory
    const inventory = await BloodInventory.find().sort({ bloodGroup: 1 });
    res.json(inventory);
  } catch (err) {
    console.error("Inventory fetch error: - inventoryRoutes.js:38", err);
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
});

/* ===== UPDATE UNITS ===== */
router.put("/:id", async (req, res) => {
  const { units } = req.body;

  try {
    const updated = await BloodInventory.findByIdAndUpdate(
      req.params.id,
      { units },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update inventory" });
  }
});

module.exports = router;
