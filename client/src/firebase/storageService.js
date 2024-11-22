// src/firebase/storageService.js
import { db, storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, doc, setDoc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';

// Upload file to Firebase Storage
export const uploadFile = async (file, fileId) => {
  const fileRef = ref(storage, `files/${fileId}`);
  await uploadBytes(fileRef, file);
  const fileUrl = await getDownloadURL(fileRef);

  return fileUrl;
};

// Store file info and expiration time in Firestore
// Store file info and expiration time in Firestore
export const storeFileInfo = async (fileId, fileUrl, expirationTimeStamp) => {
  try {
    await setDoc(doc(db, "files", fileId), {
      url: fileUrl,
      expiration: expirationTimeStamp,
      createdAt: Date.now(),
    });
  } catch (error) {
    console.error("Error storing file info:", error);
    throw error;
  }
};


// Check if the file has expired or been accessed
export const checkFileAccess = async (fileId) => {
  const fileDoc = await getDoc(doc(db, 'files', fileId));

  if (fileDoc.exists()) {
    const data = fileDoc.data();
    const currentTime = Date.now();

    if (currentTime > data.expiration) {
      await deleteFileFromStorage(fileId);
      await deleteFileFromFirestore(fileId);
      return { expired: true };
    }

    if (data.accessCount >= 1) {
      return { usedOnce: true };
    }

    await updateDoc(doc(db, 'files', fileId), {
      accessCount: data.accessCount + 1,
    });

    return { fileUrl: data.url, expired: false, usedOnce: false };
  } else {
    return { expired: true };
  }
};

// Delete file from Firebase Storage
const deleteFileFromStorage = async (fileId) => {
  const fileRef = ref(storage, `files/${fileId}`);
  await deleteObject(fileRef);
};

// Delete file info from Firestore
const deleteFileFromFirestore = async (fileId) => {
  await deleteDoc(doc(db, 'files', fileId));
};
