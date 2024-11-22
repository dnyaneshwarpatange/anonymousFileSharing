const admin = require("firebase-admin");
const serviceAccount = require("./drive-e8e69-firebase-adminsdk-58mm5-2c15b52045.json"); // Replace with your downloaded Firebase key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "drive-e8e69.appspot.com", // Replace with your storage bucket URL
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };
