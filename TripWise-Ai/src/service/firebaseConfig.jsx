// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "tripwise-ai.firebaseapp.com",
  projectId: "tripwise-ai",
  storageBucket: "tripwise-ai.firebasestorage.app",
  messagingSenderId: "585010452897",
  appId: "1:585010452897:web:a2cee70e7d1f35926713e0",
  measurementId: "G-WMETS6T4D4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
