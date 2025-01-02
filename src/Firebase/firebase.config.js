// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq5GcueNqlRALRcXMOwR0n5pUNNCNq8Bg",
  authDomain: "user-email-password-auth-24c56.firebaseapp.com",
  projectId: "user-email-password-auth-24c56",
  storageBucket: "user-email-password-auth-24c56.firebasestorage.app",
  messagingSenderId: "688490995736",
  appId: "1:688490995736:web:a4e10d4e5190a10380a36d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export default auth;