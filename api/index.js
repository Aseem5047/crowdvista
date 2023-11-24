const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const imageDownloader = require('image-downloader');
const multer = require("multer");
const fs = require("fs");
const admin = require("firebase-admin");

const AuthRoute = require('./Routes/AuthRoute');
const UserRoute = require('./Routes/UserRoute');
const ProjectRoute = require('./Routes/ProjectRoute');
const PaymentRoute = require('./Routes/PaymentRoute');

const app = express()

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "vista-45e4f.appspot.com",
});

const bucket = admin.storage().bucket();

// Middleware

app.use(express.json())
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cookieParser())
// Handle preflight requests
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
}))

dotenv.config();
const port = process.env.PORT

app.get('/', (req, res) => { res.json("Hi I am Server talking") })

// Multer storage configuration for Firebase
const multerStorage = multer.memoryStorage();
const multerUpload = multer({ storage: multerStorage });

// middleware

const photosMiddleware = multer({ dest: "uploads" })

// upload the image via link

app.post('/upload/viaLink', async (req, res) => {
    const { link } = req.body;
    const newName = "upload" + Date.now() + '.jpg';
    const destinationPath = __dirname + '/uploads/' + newName;

    try {
        await imageDownloader.image({
            url: link,
            dest: __dirname + '/uploads/' + newName
        });

        // Read the downloaded file
        const fileBuffer = fs.readFileSync(destinationPath);

        // Upload the image to Firebase Storage
        const file = bucket.file(newName);
        await file.save(fileBuffer, { contentType: 'image/jpeg' });

        res.status(200).json(newName);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// upload the image via local upload funcitonality

app.post('/upload', multerUpload.array('photos', 15), async (req, res) => {
    try {
        const uploadedFiles = [];

        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];
            const newName = `upload_${Date.now()}_${file.originalname}`;

            // Upload the image to Firebase Storage
            const fileBuffer = file.buffer;
            const firebaseFile = bucket.file(newName);
            await firebaseFile.save(fileBuffer, { contentType: file.mimetype });

            const downloadURL = await firebaseFile.getSignedUrl({ action: 'read', expires: '01-01-2100' });

            uploadedFiles.push(downloadURL);
        }

        // Flatten the array of arrays
        const flattenedArray = uploadedFiles.flat();

        res.json(flattenedArray);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// upload the profile image via local upload funcitonality

app.post('/upload/profileImage', multerUpload.array('profileUploads', 1), async (req, res) => {
    try {
        const file = req.files[0];
        const newName = `profile_${Date.now()}_${file.originalname}`;

        // Upload the profile image to Firebase Storage
        const fileBuffer = file.buffer;
        const firebaseFile = bucket.file(newName);
        await firebaseFile.save(fileBuffer, { contentType: file.mimetype });

        const downloadURL = await firebaseFile.getSignedUrl({ action: 'read', expires: '01-01-2100' });

        res.json(downloadURL);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to get all uploaded images
app.get('/getImages', async (req, res) => {
    try {
        const [files] = await bucket.getFiles();

        const images = files.map((file) => {
            // Get the download URL for each file
            const downloadURL = file.getSignedUrl({ action: 'read', expires: '01-01-2100' });

            return {
                name: file.name,
                downloadURL,
            };
        });

        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


mongoose.set('strictQuery', false);

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(port, () =>
            console.log(`Listening at ${port}`)
        )
    )
    .catch((error) => console.log(error));


// usage of routes

app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/projects', ProjectRoute)
app.use('/payment', PaymentRoute)
// app.use('/bookings', BookingsRoute)
