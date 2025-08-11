// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your Firebase config here
// const firebaseConfig = {
//   apiKey: "AIzaSyC9dxlQA1ngSEiiwiawTFSBf-ypomyuN4s",
//   authDomain: "http://event-management-3bb21.firebaseapp.com",
//   projectId: "event-management-3bb21",
//   storageBucket: "http://event-management-3bb21.firebasestorage.app",
//   messagingSenderId: "408858159926",
//   appId: "1:408858159926:web:63c24097357dae164ee197",
// };
const firebaseConfig = {
  apiKey: "AIzaSyBASJhmo16OSCPDu0-Y_iCBp619z3E0YG0",
  authDomain: "event-management-5df22.firebaseapp.com",
  projectId: "event-management-5df22",
  storageBucket: "event-management-5df22.firebasestorage.app",
  messagingSenderId: "659906363138",
  appId: "1:659906363138:web:1b17c2b7f587abdcc98c1b",
  measurementId: "G-7FLB1MR85X"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
export default app; // Export the initialized app for other uses
