const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { router } = require("./Router/apiRouter");
var cookieParser = require('cookie-parser')
const path = require('path');



const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//connexion bd
mongoose.connect("mongodb://127.0.0.1:27017/Stage_3D")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log('failed');
})


// Use cors middleware and specify allowed origin
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // Allow credentials (cookies)
}));



// Serve static files from the Storage directory
app.use('/static', express.static(path.join(__dirname, 'Storage')));

app.use('/', router)

app.listen(8000, () => {
    console.log("listen a port 8000....")
})
