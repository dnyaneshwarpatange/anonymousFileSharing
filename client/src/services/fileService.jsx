// src/services/fileService.jsx
import { db, storage } from '../firebase/firebaseConfig'; // Import Firestore and Firebase Storage
import { ref, getDownloadURL } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';

// Function to get the download link for a file
export const getDownloadLink = async (fileId) => {
  try {
    const fileDoc = await getDoc(doc(db, 'files', fileId));

    // Check if file exists in Firestore
    if (fileDoc.exists()) {
      const fileData = fileDoc.data();
      
      // Get the download URL from Firebase Storage
      const fileRef = ref(storage, `files/${fileId}`);
      const downloadUrl = await getDownloadURL(fileRef);

      return downloadUrl; // Return the download link
    } else {
      throw new Error('File not found or expired');
    }
  } catch (error) {
    console.error('Error fetching download link:', error);
    throw error;
  }
};
