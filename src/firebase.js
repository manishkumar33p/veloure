import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABiQu2dZ28MUes36hF8pw-0zt5hkWddU8",
  authDomain: "veloure-lux.firebaseapp.com",
  projectId: "veloure-lux",
  storageBucket: "veloure-lux.firebasestorage.app",
  messagingSenderId: "1011606875463",
  appId: "1:1011606875463:web:bd478f750d16b8d996b062",
  measurementId: "G-G1C1F8GBTS"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;