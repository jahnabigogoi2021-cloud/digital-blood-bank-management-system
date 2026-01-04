import React from "react";
import "./Home.css";
import heroImage from "../assets/blood.jpg";

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <h1>Blood Bank Management System</h1>
          <p>
            Saving lives through <span>digital blood donation</span>
          </p>
          <p className="sub">
            A small amount of your blood can bring hope, health, and happiness to many lives.
          </p>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Blood Donation" />
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">
          <div className="card">🩸 Easy Donor Registration</div>
          <div className="card">🏥 Quick Recipient Requests</div>
          <div className="card">📍 Location-based Donor Search</div>
          <div className="card">🤝 Volunteer Management</div>
          <div className="card">🔐 Secure Admin Access</div>
          <div className="card">⚡ Fast & Reliable System</div>
        </div>
      </section>
    </div>
  );
}
