// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKL1TRWVHUxbY3BWlM4mTcMOGueGfhOeg",
  authDomain: "netflixgpt-78e52.firebaseapp.com",
  projectId: "netflixgpt-78e52",
  storageBucket: "netflixgpt-78e52.appspot.com",
  messagingSenderId: "260634838735",
  appId: "1:260634838735:web:cbadfd6b08f28642bd19ba",
  measurementId: "G-SWP0EKVXMW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
