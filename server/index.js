require("dotenv").config(); // Import dotenv to load variables from .env file
const express = require("express");
const cron = require("node-cron");
const admin = require("firebase-admin");
const path = require("path");

// Load the service account key from the .env file
const serviceAccount = require(path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH));

// Initialize Firebase with the environment variables
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET_NAME, // Use the bucket name from .env
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not specified in .env

// Function to delete expired files
const deleteExpiredFiles = async () => {
  try {
    const now = Date.now();
    console.log("Checking for expired files...");

    const expiredFilesQuery = db.collection("files").where("expiration", "<", now);
    const expiredFiles = await expiredFilesQuery.get();

    if (expiredFiles.empty) {
      console.log("No expired files found.");
      return;
    }

    const deletePromises = expiredFiles.docs.map(async (doc) => {
      const fileData = doc.data();
      const fileId = doc.id;

      try {
        // Delete the file from Firebase Storage
        const fileRef = bucket.file(`files/${fileId}`);
        await fileRef.delete();

        // Delete the file metadata from Firestore
        await doc.ref.delete();
        console.log(`Deleted expired file: ${fileId}`);
      } catch (error) {
        console.error(`Error deleting file ${fileId}:`, error);
      }
    });

    await Promise.all(deletePromises);
    console.log("Expired files cleanup completed.");
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
};

// Schedule cleanup to run every minute
cron.schedule("* * * * *", deleteExpiredFiles);

// API route to trigger cleanup manually
app.post("/cleanup", async (req, res) => {
  try {
    await deleteExpiredFiles();
    res.status(200).send("Cleanup triggered successfully.");
  } catch (error) {
    console.error("Manual cleanup failed:", error);
    res.status(500).send("Manual cleanup failed.");
  }
});

// API route to fetch file information by ID
app.get("/files/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = db.collection("files").doc(id);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      return res.status(404).send("File not found.");
    }

    res.status(200).json(docSnapshot.data());
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).send("Error fetching file.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
