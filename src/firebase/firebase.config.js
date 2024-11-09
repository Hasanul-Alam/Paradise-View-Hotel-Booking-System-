// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaEEDGkwkSgYkhBBkdxBvtEr2N2nq8FOU",
  authDomain: "paradise-view.firebaseapp.com",
  projectId: "paradise-view",
  storageBucket: "paradise-view.firebasestorage.app",
  messagingSenderId: "646897546477",
  appId: "1:646897546477:web:2b5ebbe6df304614fe88e4",
  measurementId: "G-NBXRC0ZLTG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);