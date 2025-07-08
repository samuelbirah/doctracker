// services/firebase.ts
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  onAuthStateChanged as firebaseOnAuthStateChanged, 
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword 
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// Configuration Firebase (à remplacer par les valeurs de ton projet)
const firebaseConfig = {
  apiKey: "AIzaSyDM3e5hCtIsKsgEiDroORMmToLB4DFRUsc",
  authDomain: "doctracker-55ebd.firebaseapp.com",
  projectId: "doctracker-55ebd",
  storageBucket: "doctracker-55ebd.firebasestorage.app",
  messagingSenderId: "494904746540",
  appId: "1:494904746540:web:1a3e92cf5d73335c06a789"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const firestoreDb = getFirestore(app);

// Adapte l'API mockée au vrai Firebase
export const auth = {
  onAuthStateChanged: (callback: (user: any) => void) => {
    return firebaseOnAuthStateChanged(firebaseAuth, callback);
  },
  signInWithEmailAndPassword: (email: string, password: string) => {
    return firebaseSignInWithEmailAndPassword(firebaseAuth, email, password);
  }
};

export const db = firestoreDb;
