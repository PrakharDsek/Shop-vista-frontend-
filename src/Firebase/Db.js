import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9IWxT5pM9Pl0yCHgyj8HPmdppcLHJBtM",
  authDomain: "flipkart-f0ad6.firebaseapp.com",
  projectId: "flipkart-f0ad6",
  storageBucket: "flipkart-f0ad6.appspot.com",
  messagingSenderId: "622024825002",
  appId: "1:622024825002:web:7821a0ed57c9fda72d58d3",
  measurementId: "G-35NNNR5K19",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const storage = firebase.storage();

export { auth, provider, storage };
export default db;
