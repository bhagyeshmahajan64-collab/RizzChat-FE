// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApv5PZs6Niuxm1-BkW8qNGpTc4-dkeWik",
  authDomain: "auth-28-01-2006.firebaseapp.com",
  projectId: "auth-28-01-2006",
  storageBucket: "auth-28-01-2006.firebasestorage.app",
  messagingSenderId: "683190556972",
  appId: "1:683190556972:web:302a452768b96c5a4b3489",
  measurementId: "G-E3T2VXGE3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;