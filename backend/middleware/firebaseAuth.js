// middleware/firebaseAuth.js
const admin = require('firebase-admin');
const User = require('../models/userModel');

const firebaseAuth = async (req, res, next) => {
  const idToken = req.header('Authorization');

  if (!idToken) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, name, email } = decodedToken;

    // Attach user info to the request
    req.user = { uid, name, email };

    // Check if the user already exists in MongoDB
    let user = await User.findOne({ uid });
    if (!user) {
      // Create new user
      user = new User({ uid, name, email });
      await user.save();
      console.log('New user added to MongoDB:', user);
    }

    next();
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = firebaseAuth;
