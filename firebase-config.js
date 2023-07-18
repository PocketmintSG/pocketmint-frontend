import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-MYIPxArSkkzyS0Gig-5JqX0iM4WC7mg",
  authDomain: "pocketmint-frontend.firebaseapp.com",
  projectId: "pocketmint-frontend",
  storageBucket: "pocketmint-frontend.appspot.com",
  messagingSenderId: "106285860508",
  appId: "1:106285860508:web:05281520dc7d89150c4f59",
  measurementId: "G-SDTG6MF8V9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
