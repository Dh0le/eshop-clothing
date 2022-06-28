import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6dqqrw8-GjuTSZanz1J52teJkp5uWjxs",
  authDomain: "ecommerceshop-113d0.firebaseapp.com",
  projectId: "ecommerceshop-113d0",
  storageBucket: "ecommerceshop-113d0.appspot.com",
  messagingSenderId: "425457569653",
  appId: "1:425457569653:web:b65513b338923199320d3c",
  measurementId: "G-VFCPHTDBW2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// acquire and set up google sign in provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// get auth singleton
export const auth = getAuth();
// create two type of sign in with google
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// get singleton of firestore database
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map((docSnapshot) => docSnapshot.data());
};

// a function to create user profile in firestore databse using auth info.
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  // if current user is not authenticated
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  // if current auth user is not found in our database
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

// a api that monitor the status change
export const onAuthStateChangeListener = (callback) =>
  onAuthStateChanged(auth, callback);
