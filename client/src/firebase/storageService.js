import { v4 as uuidv4 } from 'uuid';
import { storage, db } from './firebaseConfig'; // Ensure Firebase is initialized correctly
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase v9+ modular SDK
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore'; // Firebase v9+ Firestore SDK

// Function to upload the file to Firebase Storage
export const uploadFile = async (file) => {
  if (!file) {
    throw new Error('No file provided for upload');
  }

  try {
    const fileId = uuidv4();
    const storageRef = ref(storage, `files/${fileId}`);
    
    // Upload the file to storage
    const snapshot = await uploadBytes(storageRef, file);
    if (!snapshot) {
      throw new Error('Upload failed - no snapshot returned');
    }

    // Get the download URL after uploading
    const url = await getDownloadURL(storageRef);
    if (!url) {
      throw new Error('Failed to get download URL');
    }

    return { url, fileId };
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error(`Error uploading file: ${error.message}`);
  }
};

// Function to store file metadata in Firestore
export const storeFileInfo = async (fileId, url, expirationTimeStamp) => {
  if (!fileId || !url || !expirationTimeStamp) {
    throw new Error('Missing required parameters for storing file info');
  }

  try {
    const fileData = {
      fileId,
      url,
      expiration: expirationTimeStamp,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'files', fileId), fileData);
    return fileId;
  } catch (error) {
    console.error('Store metadata error:', error);
    throw new Error(`Error saving file metadata: ${error.message}`);
  }
};
