// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLrft2CVhia2mL8RqNl9ACslsnqItfXWA",
  authDomain: "trading-app-be402.firebaseapp.com",
  projectId: "trading-app-be402",
  storageBucket: "trading-app-be402.firebasestorage.app",
  messagingSenderId: "984573845323",
  appId: "1:984573845323:web:f97f8dc5ae912ac03612ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const auth = getAuth(app);
export const googleAuthProvider = new  GoogleAuthProvider(); //auth provider pára hacer autenticaicon con google 