import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  writeBatch,
  collection,
  query,
  getDocs,
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

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, provider).catch((error) => alert(error.message));

export const db = getFirestore();

export const uploadCollectionAndDocuments = async (collectionKey, data) => {
  //Using batch to proceed set() inorder to ensure the completion of data

  //create a batch
  const batch = writeBatch(db);

  //get collection reference
  const collectionRef = collection(db, collectionKey);

  //handle raw data into firebase
  data.forEach((object) => {
    //get document reference
    const docRef = doc(collectionRef, object.title.toLowerCase());

    console.log(docRef, object);

    //set data to docRef
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("update successfully");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const productsDocsData = querySnapshot.docs.map((doc) => doc.data());

  return productsDocsData;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalData = {}
) => {
  if (!userAuth) return;

  //Create user document in firebase
  const userDocRef = doc(db, "user", userAuth.uid);

  //Get document snapshot using getDoc method
  const userSnapshot = await getDoc(userDocRef);

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

  return userSnapshot;
};

export const createUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};

//get currentUser if user sign in
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
