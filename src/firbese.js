// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbNnM8W1_nM9Dx3G7loa-onCIKP19_298",
  authDomain: "homevork-ee3cc.firebaseapp.com",
  projectId: "homevork-ee3cc",
  storageBucket: "homevork-ee3cc.appspot.com",
  messagingSenderId: "728909070162",
  appId: "1:728909070162:web:069eed1410b50a44cd048b",
  measurementId: "G-4ZKN0CBJP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imgDB = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
