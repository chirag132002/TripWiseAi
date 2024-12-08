// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWyRre1Xz9lgHdMJd5tl4seM1qr3Pi1gk",
  authDomain: "tripwise-ai.firebaseapp.com",
  projectId: "tripwise-ai",
  storageBucket: "tripwise-ai.firebasestorage.app",
  messagingSenderId: "585010452897",
  appId: "1:585010452897:web:a2cee70e7d1f35926713e0",
  measurementId: "G-WMETS6T4D4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);