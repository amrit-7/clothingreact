import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDec9Lqkm-a-ljgvHPOb3cOlweMZHZzGbI",
  authDomain: "clothingapp-b08e2.firebaseapp.com",
  projectId: "clothingapp-b08e2",
  storageBucket: "clothingapp-b08e2.appspot.com",
  messagingSenderId: "918708213282",
  appId: "1:918708213282:web:3b3e2511dc692145041c7b",
  measurementId: "G-S7F0R26Q1R",
};

export const firebaseapp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;
  const userDoc = doc(db, "users", userAuth.uid);
  // console.log(userDoc);
  const userSnapshot = await getDoc(userDoc);
  // console.log(userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDoc, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return userDoc;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const loginAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
