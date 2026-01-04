import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= LOGIN (ALL ROLES) ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      const { token, role, user } = res.data;

      // Save auth data
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful");

      // Role-based redirect
      if (role === "admin") navigate("/admin-dashboard");
      else if (role === "donor") navigate("/donor-dashboard");
      else if (role === "recipient") navigate("/recipient-dashboard");
      else if (role === "volunteer") navigate("/volunteer-dashboard");
      else navigate("/");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  /* ================= FORGOT PASSWORD (ACADEMIC DEMO) ================= */
  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      alert("Please enter your registered email");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email: forgotEmail }
      );

      alert(
        "Password reset feature is disabled for demo projects.\n\nIf this email exists, instructions would be sent."
      );

      setForgotEmail("");
      setShowForgot(false);
    } catch (err) {
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto" }}>
      <h2 style={{ textAlign: "center" }}>User Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
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

        <button type="submit" style={{ width: "100%" }}>
          Login
        </button>
      </form>

      {/* Forgot Password */}
      <p
        style={{
          marginTop: "12px",
          color: "#1976d2",
          cursor: "pointer",
          textAlign: "center",
        }}
        onClick={() => setShowForgot(!showForgot)}
      >
        Forgot Password?
      </p>

      {showForgot && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
          />
          <button
            type="button"
            style={{ marginTop: "5px", width: "100%" }}
            onClick={handleForgotPassword}
          >
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
