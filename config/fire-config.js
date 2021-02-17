import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBACltD3bF0ibkmSGfrh-DY65SMaqkNA7U",
  authDomain: "sellpoint-d7047.firebaseapp.com",
  projectId: "sellpoint-d7047",
  storageBucket: "sellpoint-d7047.appspot.com",
  messagingSenderId: "241204067717",
  appId: "1:241204067717:web:2f1f52b8952e8c2026d8ec",
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}
const fire = firebase;

export const auth = firebase.auth();
export const db = firebase.firestore();



export default fire;
