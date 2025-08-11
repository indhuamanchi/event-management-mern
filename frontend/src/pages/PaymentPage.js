import React, { useState, useEffect } from "react";
import "../styles/PaymentPage.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const { eventId } = useParams();
  const navigate = useNavigate();
  const ticketCount = localStorage.getItem("ticketCount");

  const handlePayment = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!eventId || !ticketCount) {
      setPaymentStatus("❌ Missing event ID or ticket count.");
      return;
    }

    // Simulate payment success/failure
    const isSuccess = Math.random() > 0.3;

    if (isSuccess) {
      try {
        const response = await axios.post("http://localhost:5000/api/create", {
          eventId: eventId,
          tickets: parseInt(ticketCount),
        });

        if (response.status === 201 || response.status === 200) {
          setPaymentStatus("✅ Payment Successful!");
          localStorage.removeItem("ticketCount");

          // Redirect after delay
          setTimeout(() => {
            navigate("/user-home");
          }, 2000);
        } else {
          console.error("Unexpected response:", response);
          setPaymentStatus("❌ Payment succeeded, but booking update failed!");
        }
      } catch (err) {
        console.error("Error sending booking to backend:", err);
        setPaymentStatus("❌ Payment succeeded, but booking update failed!");
      }
    } else {
      setPaymentStatus("❌ Payment Failed!");
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h2>Fake Payment Portal</h2>
        <form id="payment-form" onSubmit={handlePayment}>
          <label>Card Number</label>
          <input type="text" placeholder="1234 5678 9012 3456" required />

          <div className="row">
            <div>
              <label>Expiry Date</label>
              <input type="text" placeholder="MM/YY" required />
            </div>
            <div>
              <label>CVV</label>
              <input type="text" placeholder="123" required />
            </div>
          </div>

          <label>Cardholder Name</label>
          <input type="text" placeholder="John Doe" required />

          <button type="submit">Pay Now</button>
        </form>

        <p style={{ color: paymentStatus.includes("✅") ? "green" : "red", marginTop: "20px" }}>
          {paymentStatus}
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;