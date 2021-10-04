import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { firebaseConfig } from "./config";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const authPersistenceSession = firebase.auth.Auth.Persistence.SESSION;
export const db = firebase.firestore();
export const storage = firebase.storage();
