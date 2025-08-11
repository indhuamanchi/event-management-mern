import React, { useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // CSS for styling

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("user"); // Default role: user
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ For navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
  
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        console.log("Stored Role in Firestore:", role);
        console.log("Selected Role:", selectedRole);

        if (role !== selectedRole) {
          setError(`Incorrect role selection. Your role is "${role}".`);
          return;
        }
  
        // Redirect based on Firestore role
        if (role === "organizer") {
          localStorage.setItem("organizerId", user.uid);
          navigate("/orghome"); // Organizer dashboard
        } else {
          navigate("/user-home");
        }
      } else {
        setError("User role not found. Contact support.");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} required>
          <option value="user">User</option>
          <option value="organizer">Organizer</option>
        </select>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span></p>
    </div>
  );
};

export default LoginPage;