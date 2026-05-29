import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import 'firebase/compat/functions'
import { firebaseConfig } from './config'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const authPersistenceSession = firebase.auth.Auth.Persistence.SESSION
export const db = firebase.firestore()
export const storage = firebase.storage()
export const functions = firebase.functions()
export const firebaseTimeStamp = firebase.firestore.Timestamp
export type FirebaseTimestampType = firebase.firestore.Timestamp
export const adminsRef = db.collection('admin')
