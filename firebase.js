import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// Your TrackYourTreat Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWhlvfzFVQciVWfgMU8T44jLgwYN5lRXI",
  authDomain: "trackyourtreat.firebaseapp.com",
  projectId: "trackyourtreat",
  storageBucket: "trackyourtreat.firebasestorage.app",
  messagingSenderId: "384533157822",
  appId: "1:384533157822:web:496344fb6debb56da38bef",
  measurementId: "G-GS20RCQR6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
const db = getFirestore(app);

// TEST 1: Add a house to Firebase
export async function addHouse() {
  const docRef = await addDoc(collection(db, "houses"), {
    name: "Test Halloween House",
    latitude: 39.2557,
    longitude: -76.7112,
    hasCandy: true,
    createdAt: new Date()
  });

  console.log("House added:", docRef.id);
  return docRef.id;
}

// TEST 2: Retrieve all houses from Firebase
export async function getHouses() {
  const snapshot = await getDocs(collection(db, "houses"));

  const houses = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  console.log("Retrieved houses:", houses);
  return houses;
}
