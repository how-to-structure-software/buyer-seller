import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore'; // make sure you add this for firestore
import {
  FIREBASE_KEY,
  FIREBASE_DOMAIN,
  FIREBASE_DATABASE,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_SENDER_ID,
} from '../Config';

export const config = {
  apiKey: FIREBASE_KEY,
  authDomain: FIREBASE_DOMAIN,
  databaseURL: FIREBASE_DATABASE,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_SENDER_ID,
};

// Initialize Firebase and Firestore

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true });
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export {
  auth,
  firebase,
  firestore,
};
