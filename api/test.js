const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const admin = require("firebase-admin");
const serviceAccount = require("./path/to/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "your-firebase-storage-bucket-url",
});

const bucket = admin.storage().bucket();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Multer to use Firebase Storage
const multerStorage = multer.memoryStorage();
const multerUpload = multer({ storage: multerStorage });

app.post("/upload", multerUpload.array("images", 5), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files provided" });
        }

        const uploadedFiles = [];

        // Iterate over each uploaded file
        for (const file of req.files) {
            const fileBuffer = file.buffer;
            const originalname = file.originalname;

            // Define the path in Firebase Storage where the file will be stored
            const storagePath = `images/${originalname}`;

            // Upload the file to Firebase Storage
            const firebaseFile = bucket.file(storagePath);
            await firebaseFile.save(fileBuffer);

            // Get the public URL of the uploaded file
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${storagePath}`;

            uploadedFiles.push({ originalname, imageUrl: publicUrl });
        }

        res.status(200).json(uploadedFiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
