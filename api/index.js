const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const imageDownloader = require('image-downloader');
const multer = require("multer");
const fs = require("fs");

const AuthRoute = require('./Routes/AuthRoute');
const UserRoute = require('./Routes/UserRoute');
const ProjectRoute = require('./Routes/ProjectRoute');
const PaymentRoute = require('./Routes/PaymentRoute');

const app = express()

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

app.use('/', (req, res) => { res.json("Hi I am Server talking") })

// middleware

const photosMiddleware = multer({ dest: "uploads" })

// upload the image via link

app.post('/upload/viaLink', async (req, res) => {
    const { link } = req.body
    const newName = "upload" + Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName

    })
    res.status(200).json(newName)
});

// upload the image via local upload funcitonality

app.post('/upload', photosMiddleware.array('photos', 15), (req, res) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i]
        // console.log(path, originalname);
        // uploads\08e34fca4f822d4ded76db133be65c9e Patterns-4K-Ultra-HD-Wallpaper-3840x2160.jpg
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads\\', ''))
    }
    res.json(uploadedFiles)
})

// upload the profile image via local upload funcitonality

app.post('/upload/profileImage', photosMiddleware.array('profileUploads', 1), (req, res) => {
    // const uploadedFiles = []
    const { path, originalname } = req.files[0]
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)
    // uploadedFiles.push(newPath.replace('uploads\\', ''))

    res.json(newPath.replace('uploads\\', ''))
})


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
