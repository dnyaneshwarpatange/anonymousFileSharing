// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: "AIzaSyBPUdDFl4nPIqEEw9iXMqi5pIyOXZNiKUo",
  authDomain: "drive-e8e69.firebaseapp.com",
  databaseURL: "https://drive-e8e69-default-rtdb.firebaseio.com",
  projectId: "drive-e8e69",
  storageBucket: "drive-e8e69.appspot.com",
  messagingSenderId: "842498275577",
  appId: "1:842498275577:web:0d722f7ea41b25e56b8a28"
};


// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

// Export Firestore and Storage instances
export { db, storage };