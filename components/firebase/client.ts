import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPOkJOoXtP5Lhvv9Wvk2381twLSEAGb5o",
  authDomain: "language-trainer-da22a.firebaseapp.com",
  projectId: "language-trainer-da22a",
  storageBucket: "language-trainer-da22a.firebasestorage.app",
  messagingSenderId: "880426739094",
  appId: "1:880426739094:web:aad88611317ee16fef69b7",
  measurementId: "G-YKN5BRDNJ7"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

