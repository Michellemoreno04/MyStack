// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDH68q0OX0q-NtLsHfBxRvxdxafGcjmvDE",
  authDomain: "mystack-4cee6.firebaseapp.com",
  projectId: "mystack-4cee6",
  storageBucket: "mystack-4cee6.appspot.com",
  messagingSenderId: "484070788774",
  appId: "1:484070788774:web:3942e06cf54d1319c52e67"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);

export { db };