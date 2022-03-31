import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyAl7l49mmqzyW1yTTJDnDGYcdW5Hno3BmQ",
  authDomain: "clandestine-potatoes.firebaseapp.com",
  projectId: "clandestine-potatoes",
  storageBucket: "clandestine-potatoes.appspot.com",
  messagingSenderId: "883930222578",
  appId: "1:883930222578:web:d449a0575d8469eaa0256b",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
