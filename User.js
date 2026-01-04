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

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["donor", "recipient", "volunteer", "admin"],
      required: true,
      default: "recipient"
    },

    /* ===== Donor Specific ===== */
    bloodType: {
      type: String,
      enum: BLOOD_GROUPS
    },
    lastDonationDate: {
      type: Date
    },

    /* ===== Recipient Specific ===== */
    hospital: {
      type: String,
      trim: true
    },
    urgency: {
      type: String,
      enum: ["low", "medium", "high"]
    },

    /* ===== Volunteer Specific ===== */
    area: {
      type: String,
      trim: true
    },
    availability: {
      type: String,
      enum: ["available", "busy", "offline"],
      default: "available"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
