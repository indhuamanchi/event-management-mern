import React, { useState } from "react";
import "../styles/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`privacy-container ${isDarkMode ? "dark" : "light"}`}>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: isDarkMode ? "#ccc" : "#333",
          color: isDarkMode ? "#000" : "#fff",
          cursor: "pointer"
        }}
      >
        Switch to {isDarkMode ? "Light" : "Dark"} Mode
      </button>

      <h1>Privacy Policy</h1>
      <p>We value your privacy. This Privacy Policy explains how we collect, use, and protect your information.</p>

      <h2>What Information We Collect</h2>
      <p>We may collect personal information such as your name, email address, and booking history when you use our site.</p>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To provide and improve our services</li>
        <li>To send you updates and notifications</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>How We Protect Your Data</h2>
      <p>We use secure technologies and follow best practices to keep your data safe.</p>

      <h2>Third-Party Services</h2>
      <p>We may use third-party services (like Firebase) to manage authentication and data. These services may collect their own data.</p>

      <h2>Contact Us</h2>
      <p>If you have any questions about our policy, feel free to reach out to us at support@example.com.</p>
    </div>
    
  );
  
};

export default PrivacyPolicy;