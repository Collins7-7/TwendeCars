// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "car-hire-dc13f.firebaseapp.com",
  projectId: "car-hire-dc13f",
  storageBucket: "car-hire-dc13f.appspot.com",
  messagingSenderId: "741453412393",
  appId: "1:741453412393:web:0b73a18c80ffef3bd30438",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
