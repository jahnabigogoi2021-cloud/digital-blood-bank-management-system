const mongoose = require("mongoose");

const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-"
];

const bloodInventorySchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      required: true,
      enum: BLOOD_GROUPS,   // ✅ restrict to valid groups
      unique: true,
      trim: true
    },
    units: {
      type: Number,
      required: true,
      default: 0,
      min: 0               // ✅ no negative stock
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("BloodInventory", bloodInventorySchema);
