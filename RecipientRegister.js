import React, { useState } from "react";
import axios from "axios";

const RecipientRegister = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    bloodType: "",
    hospital: "",
    urgency: "",
    role: "recipient",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Recipient registered successfully");
      setForm({
        username: "",
        email: "",
        phone: "",
        password: "",
        bloodType: "",
        hospital: "",
        urgency: "",
        role: "recipient",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Recipient Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Full Name"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          type="tel"
          placeholder="Mobile Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select
          name="bloodType"
          value={form.bloodType}
          onChange={handleChange}
          required
        >
          <option value="">Blood Group Needed</option>
          <option>A+</option><option>A-</option>
          <option>B+</option><option>B-</option>
          <option>AB+</option><option>AB-</option>
          <option>O+</option><option>O-</option>
        </select>

        <input
          name="hospital"
          placeholder="Hospital Name"
          value={form.hospital}
          onChange={handleChange}
          required
        />

        <select
          name="urgency"
          value={form.urgency}
          onChange={handleChange}
          required
        >
          <option value="">Urgency Level</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Emergency</option>
        </select>

        <button type="submit" style={{ marginTop: "1rem" }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RecipientRegister;
