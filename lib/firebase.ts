import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3ayc9b5whcZWB05o7xYu7gKRswVLTcmw",
  authDomain: "webfood-e022b.firebaseapp.com",
  projectId: "webfood-e022b",
  storageBucket: "webfood-e022b.firebasestorage.app",
  messagingSenderId: "96540249168",
  appId: "1:96540249168:web:e893f1cbf95bd7ded89555",
  measurementId: "G-BELTKDF2PX"
};

// Initialize Firebase once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
