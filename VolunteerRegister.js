import React, { useState } from "react";
import axios from "axios";

const VolunteerRegister = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    area: "",
    availability: "",
    role: "volunteer",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Volunteer registered successfully");

      setForm({
        username: "",
        email: "",
        phone: "",
        password: "",
        area: "",
        availability: "",
        role: "volunteer",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Volunteer Registration</h2>

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

        <input
          name="area"
          placeholder="Area / City"
          value={form.area}
          onChange={handleChange}
          required
        />

        <select
          name="availability"
          value={form.availability}
          onChange={handleChange}
          required
        >
          <option value="">Availability</option>
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Weekends</option>
        </select>

        <button type="submit" style={{ marginTop: "1rem" }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default VolunteerRegister;
