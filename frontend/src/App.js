import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // Firebase setup

// Components & Pages
import Navbar from "./components/Navbar";
import EventList from "./components/EventList";
import HomePage from "./pages/UserHome";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import SignupPage from "./pages/SignupPage";
import UserHome from "./pages/UserHome";
import OrgHome from "./pages/orghome"; // Organizer Home/Dashboard
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile"; // Adjust path if needed
import PrivacyPolicy from "./pages/PrivacyPolicy"; 


function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Router>
      <Layout user={user}>
        <Routes>
        <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/payment/:eventId" element={<PaymentPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* User protected routes */}
          <Route
            path="/book/:eventId"
            element={
              user && role === "user" ? <BookingPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/user-home"
            element={
              user && role === "user" ? <UserHome /> : <Navigate to="/login" />
            }
          />

          {/* Organizer protected route */}
          <Route
            path="/orghome"
            element={
              user && role === "organizer" ? <OrgHome /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

const Layout = ({ children, user }) => {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/signup"];

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar user={user} />}
      {children}
    </>
  );
};

export default App;