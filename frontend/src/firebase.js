// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC9dxlQA1ngSEiiwiawTFSBf-ypomyuN4s",
  authDomain: "event-management-3bb21.firebaseapp.com",
  projectId: "event-management-3bb21",
  storageBucket: "event-management-3bb21.appspot.com",
  messagingSenderId: "408858159926",
  appId: "1:408858159926:web:63c24097357dae164ee197",
  measurementId: "G-K5P9G7NQE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export only once
export { auth, db, storage };
export default app;