// services/firebase.ts
import { initializeApp } from "firebase/app";
import { 
  getAuth,
  onAuthStateChanged as firebaseOnAuthStateChanged, 
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword ,
  updateProfile
} from "firebase/auth";

import { Doc } from "../types/document";

import { 
  doc, 
  updateDoc,
  getFirestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot
} from "firebase/firestore";

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
export const firebaseAuth = getAuth(app);
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

export const addDocument = async (doc: Doc): Promise<void> => {
  try {
    await addDoc(collection(db, "documents"), doc);
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const db = firestoreDb;

export const updateDocument = async (docId: string, updates: Partial<Doc>) => {
  try {
    await updateDoc(doc(db, "documents", docId), updates);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

export const getDocumentsByUser = async (userId: string) => {
  const q = query(
    collection(db, "documents"),
    where("emitter", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Doc[];
};

export const subscribeToDocuments = (callback: (docs: Doc[]) => void) => {
  return onSnapshot(collection(db, "documents"), (snapshot) => {
    const docs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Doc[];
    callback(docs);
  });
};

export const updateUserProfile = async (updates: {
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  department?:string;
}) => {
  if (!firebaseAuth.currentUser) throw new Error('User not authenticated');
  
  await updateProfile(firebaseAuth.currentUser, updates);
  return firebaseAuth.currentUser.reload();
};
