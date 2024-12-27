// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importa Firestore
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQkQf5wnwk_qtU724Ndtgz8NQLXSIKK2Q",
  authDomain: "emine-3b2f0.firebaseapp.com",
  projectId: "emine-3b2f0",
  storageBucket: "emine-3b2f0.appspot.com",
  messagingSenderId: "481502123102",
  appId: "1:481502123102:web:93e349414970037b8e90cf",
  measurementId: "G-0ECQV2LYWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Inicializa Firestore

export { db };