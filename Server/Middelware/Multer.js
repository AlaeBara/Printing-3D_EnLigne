const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Storage/');
    },
    filename: function (req, file, cb) {
        const userEmail = req.body.email; // Get the user email from the request body
        const date = req.body.date
        const combinedFileName = `${userEmail}_${date}_${file.originalname}`; // Combine email, time, and filename
        cb(null, combinedFileName); // Set the combined filename
    }
});


const upload = multer({ storage: storage });

module.exports = { upload };
