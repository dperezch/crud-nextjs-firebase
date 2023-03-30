// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/*  */
import { getFirestore } from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCjF-W-3RtxwFm_B1DSSjECk1Yn_T2KE8",
  authDomain: "crud-nextjs-firebase-417bc.firebaseapp.com",
  projectId: "crud-nextjs-firebase-417bc",
  storageBucket: "crud-nextjs-firebase-417bc.appspot.com",
  messagingSenderId: "491656340904",
  appId: "1:491656340904:web:1addb26ef8061b8f5ea99d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Enviar firestore
const db = getFirestore();

export {db}