require("dotenv").config();
const express = require("express");
const cron = require("node-cron");
const admin = require("firebase-admin");
const path = require("path");

// Load the service account key from the .env file
let serviceAccount;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH) {
    serviceAccount = require(path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH));
  } else {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY_PATH not found in environment variables');
  }
} catch (error) {
  console.error('Error loading Firebase service account:', error);
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET_NAME,
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

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
        const fileRef = bucket.file(`files/${fileId}`);
        await fileRef.delete(); // Delete from Firebase storage
        await doc.ref.delete(); // Delete from Firestore
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

// Run cleanup every minute
cron.schedule("* * * * *", deleteExpiredFiles);

// Manually trigger cleanup
app.post("/cleanup", async (req, res) => {
  try {
    await deleteExpiredFiles();
    res.status(200).send("Cleanup triggered successfully.");
  } catch (error) {
    console.error("Manual cleanup failed:", error);
    res.status(500).send("Manual cleanup failed.");
  }
});

// Endpoint to fetch file by ID
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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
