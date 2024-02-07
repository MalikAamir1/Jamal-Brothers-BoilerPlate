// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from '@react-native-firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2plqSJMoNVC77aV6938JagcvvhOZ2hMc",
  authDomain: "chatapp-36558.firebaseapp.com",
  databaseURL: "https://chatapp-36558-default-rtdb.firebaseio.com",
  projectId: "chatapp-36558",
  storageBucket: "chatapp-36558.appspot.com",
  messagingSenderId: "742048142463",
  appId: "1:742048142463:web:a7fe33665e7977d8145b4a",
  measurementId: "G-6P1582ZY3C"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export default app;