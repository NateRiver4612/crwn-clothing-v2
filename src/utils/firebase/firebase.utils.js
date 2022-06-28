import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA40c9yeMiCqj1ixTrMWIDsoRpugFhvpFA",
  authDomain: "crwn-clonthing-v2.firebaseapp.com",
  projectId: "crwn-clonthing-v2",
  storageBucket: "crwn-clonthing-v2.appspot.com",
  messagingSenderId: "126109521047",
  appId: "1:126109521047:web:a97edfa5c20ae5c39785d2",
  measurementId: "G-TRZ207YF5T",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalData = {}
) => {
  if (!userAuth) return;

  //Create user document in firebase
  const userDocRef = doc(db, "user", userAuth.uid);
  console.log(userDocRef);

  //Get document snapshot using getDoc method
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  //check is user exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        displayName,
        ...additionalData,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userDocRef;
};

export const createUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
