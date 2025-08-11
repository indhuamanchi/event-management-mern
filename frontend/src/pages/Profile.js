import React, { useState } from "react";
import "../styles/Profile.css";
import {
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../firebase";

const Profile = () => {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(user, { displayName });
      alert("Profile updated!");
    } catch (err) {
      alert("Error updating profile: " + err.message);
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      alert("Please enter both current and new passwords.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      alert("Password changed successfully!");
    } catch (err) {
      console.error(err);
      alert("Error changing password: " + err.message);
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile Settings</h2>

      <div className="profile-field">
        <label>Display Name</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>

      <div className="profile-field">
        <label>Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      <div className="profile-field">
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <button onClick={handleUpdateProfile}>Update Profile</button>
      <button onClick={handlePasswordChange}>Change Password</button>
    </div>
  );
};

export default Profile;